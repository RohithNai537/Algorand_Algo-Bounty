import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import { WalletState, WalletAccount } from '../types';

// Initialize Pera Wallet connector
const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: true,
});

// Initial wallet state
const initialState: WalletState = {
  isConnected: false,
  account: null,
  isConnecting: false,
  error: null,
};

// Wallet action types
type WalletAction =
  | { type: 'CONNECT_REQUEST' }
  | { type: 'CONNECT_SUCCESS'; payload: WalletAccount }
  | { type: 'CONNECT_FAILURE'; payload: string }
  | { type: 'DISCONNECT' };

// Wallet reducer
const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'CONNECT_REQUEST':
      return { ...state, isConnecting: true, error: null };
    case 'CONNECT_SUCCESS':
      return { ...state, isConnected: true, account: action.payload, isConnecting: false, error: null };
    case 'CONNECT_FAILURE':
      return { ...state, isConnected: false, account: null, isConnecting: false, error: action.payload };
    case 'DISCONNECT':
      return { ...state, isConnected: false, account: null, isConnecting: false, error: null };
    default:
      return state;
  }
};

// Create context
type WalletContextType = {
  state: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider component
export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  useEffect(() => {
    // Load stored account on mount
    const storedAccount = localStorage.getItem('walletAccount');
    if (storedAccount) {
      try {
        const account = JSON.parse(storedAccount) as WalletAccount;
        dispatch({ type: 'CONNECT_SUCCESS', payload: account });
      } catch {
        localStorage.removeItem('walletAccount');
      }
    }

    // Try to reconnect session
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        if (accounts.length > 0) {
          const account: WalletAccount = {
            address: accounts[0],
            name: `Account ${accounts[0].substring(0, 4)}...${accounts[0].slice(-4)}`,
          };
          dispatch({ type: 'CONNECT_SUCCESS', payload: account });
          localStorage.setItem('walletAccount', JSON.stringify(account));
        }
      })
      .catch((error: unknown) => {
        console.error('Reconnect error:', error);
      });

    // Listen for disconnect event
    peraWallet.connector?.on('disconnect', () => {
      dispatch({ type: 'DISCONNECT' });
      localStorage.removeItem('walletAccount');
    });

    // Cleanup on unmount
    return () => {
      peraWallet.connector?.off('disconnect');
    };
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    dispatch({ type: 'CONNECT_REQUEST' });
    try {
      const accounts = await peraWallet.connect();
      if (accounts && accounts.length > 0) {
        const account: WalletAccount = {
          address: accounts[0],
          name: `Account ${accounts[0].substring(0, 4)}...${accounts[0].slice(-4)}`,
        };
        dispatch({ type: 'CONNECT_SUCCESS', payload: account });
        localStorage.setItem('walletAccount', JSON.stringify(account));
      } else {
        dispatch({ type: 'CONNECT_FAILURE', payload: 'No accounts found' });
      }
    } catch (error: unknown) {
      console.error('Connection error:', error);
      dispatch({ type: 'CONNECT_FAILURE', payload: 'Failed to connect wallet' });
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    peraWallet.disconnect();
    localStorage.removeItem('walletAccount');
    dispatch({ type: 'DISCONNECT' });
  };

  return (
    <WalletContext.Provider value={{ state, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use wallet context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
