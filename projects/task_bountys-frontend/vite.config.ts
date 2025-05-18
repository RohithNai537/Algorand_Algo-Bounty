import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    // Fix for packages expecting 'global' in browser environment
    global: 'window',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // allows '@/components/Button' instead of relative paths
    },
  },
});
