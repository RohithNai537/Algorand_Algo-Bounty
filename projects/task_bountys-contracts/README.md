# task_bountys-contracts

This project has been generated using AlgoKit. See below for default getting started instructions.

## Setup

### Pre-requisites

- [Python 3.12](https://www.python.org/downloads/) or later  
- [Docker](https://www.docker.com/) (only required for LocalNet)  

> For interactive tour over the codebase, download [vsls-contrib.codetour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour) extension for VS Code, then open the [`.codetour.json`](./.tours/getting-started-with-your-algokit-project.tour) file in code tour extension.

### Initial Setup

#### 1. Clone the Repository

Start by cloning this repository to your local machine.

#### 2. Install Pre-requisites

Ensure the following pre-requisites are installed and properly configured:

- **Docker**: Required for running a local Algorand network. [Install Docker](https://www.docker.com/)  
- **AlgoKit CLI**: Install from [AlgoKit CLI Installation Guide](https://github.com/algorandfoundation/algokit-cli#install)  
  Verify with `algokit --version` (expecting `2.0.0+`)

#### 3. Bootstrap Your Local Environment

Run the following commands within the project folder:

- **Install Poetry**: [Installation Guide](https://python-poetry.org/docs/#installation)  
  Verify with `poetry -V` (version `1.2+`)

- **Setup Project**

<pre> ```bash algokit project bootstrap all ``` </pre>

## Configure Environment

<pre>
```bash
algokit generate env-file -a target_network localnet
</pre> ```


## Start LocalNet

algokit localnet start


## Development Workflow

### Terminal

**Build Contracts**

algokit project run build

To build a specific contract:

algokit project run build -- hello_world



**Deploy Contracts**

algokit project deploy localnet


To deploy a specific contract:

algokit project deploy localnet -- hello_world


### VS Code

1. **Open Project**: Open the repository root in VS Code  
2. **Install Extensions**: Install all recommended extensions  
3. **Debugging**:
   - Use `F5` to start debugging  
   - **Windows Users**: Select interpreter via  
     `Ctrl+Shift+P` → `Python: Select Interpreter` → `./.venv/Scripts/python.exe`

### JetBrains IDEs

1. Open the repository root in your JetBrains IDE  
2. Interpreter and venv setup should be automatic  
3. Use `Shift+F10` or `Ctrl+R` to run/debug

> Windows users may face pre-launch task issues. [JetBrains workaround](https://youtrack.jetbrains.com/issue/IDEA-277486/Shell-script-configuration-cannot-run-as-before-launch-task)

## AlgoKit Workspaces and Project Management

Supports standalone and monorepo setups via AlgoKit workspaces.  
Use `algokit project run` for managing multiple contracts.

## AlgoKit Generators

### Generate Smart Contract

By default, `HelloWorld` contract exists under `smart_contracts/task_bountys/`.

To add a new one:

algokit generate smart-contract


Then:

- Update `deploy_config.py` for custom deployment logic  
- `config.py` will automatically build all contracts. You may modify to build selectively

### Generate `.env` files

To generate a `.env.{target_network}`:

algokit generate env-file


## Debugging Smart Contracts

Supports debugging with [AlgoKit AVM Debugger](https://marketplace.visualstudio.com/items?itemName=algorandfoundation.algokit-avm-vscode-debugger)

Steps:

1. Install extension in VS Code  
2. Use `Debug TEAL via AlgoKit AVM Debugger` launch configuration  
3. Follow prompts to select trace file

For setup: [Debugger GitHub](https://github.com/algorandfoundation/algokit-avm-vscode-debugger)

## Tools

- [Algorand](https://www.algorand.com/) — Layer 1 blockchain  
- [AlgoKit CLI](https://github.com/algorandfoundation/algokit-cli) — Developer CLI  
- [Algorand Python (Puya)](https://github.com/algorandfoundation/puya) — Python for smart contracts  
- [AlgoKit Utils](https://github.com/algorandfoundation/algokit-utils-py) — Algorand helper functions  
- [Poetry](https://python-poetry.org/) — Dependency and package manager  
- [VS Code](https://code.visualstudio.com/) — Optimized for dev experience with this project
