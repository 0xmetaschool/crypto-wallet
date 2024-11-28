# Metaschool Crypto Wallet
The Metaschool Crypto Wallet is an intuitive Chrome extension that enables users to securely send cryptocurrency between wallets, switch between blockchain networks, manage digital assets, import accounts using private keys, add ERC-20 tokens, ensure strong authentication, and track detailed transaction history.

## Table of Contents

- [Tech-Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [How to Run the Crypto Wallet](#how-to-run-the-crypto-wallet)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Contact](#contact)

## Tech-Stack
- Solidity
- MongoDB
- Ether.js
- Express.js

## Features
This Crypto Wallet application includes the following features:

- **User Authentication:** Users can sign up, log in, and log out of their accounts.
- **Choose Blockchain Network:** Select the blockchain network (e.g., Ethereum, BNB, Polygon) you want to interact with.
- **Send Crypto:** Transfer cryptocurrency to another wallet.
- **Import Account Using Private Key:** Securely import a crypto wallet using the private key.
- **Import ERC-20 Tokens:** Add tokens (e.g., DAI, USDT, USDC, etc.) using their token address.
- **Account History:** Track transaction history within the wallet.

## Getting Started
### Prerequisites
- #### Setting Up MongoDB Cluster
    Follow these steps to set up your MongoDB cluster:
    
    - **Sign Up/Login:** Visit [MongoDB Website](https://www.mongodb.com/), and sign up or log in.
    - **Create a Cluster:** Once logged in, click on "Build a Cluster". Choose an AWS cloud provider, select a region, and make sure you choose a connection method :Connecting with MongoDB for VS Code, then click "Create Cluster".
    - **Database Access:** Go to the "Database Access" section to find your MongoDB username and password. Copy these credentials for use in the next steps.
    - **Connection String:** You will need these credentials to connect to your MongoDB cluster, which will be used in your configuration files.

### How to Run the Crypto Wallet
1. Clone the repository:
    ```bash
    git clone https://github.com/0xmetaschool/crypto-wallet.git
    ```
2. Install Dependencies: Navigate to the project directory and install the necessary dependencies:
    ```bash
    cd crypto-wallet/chromeapi
    npm install --y
    ```
3. Configure MongoDB:
      - Open the config.env files.
      - Replace the placeholders for MONGODB_URI and MONGODB_DB_NAME with your actual credentials.

4. Start the Development Server: Run the following command to launch the app locally:
    ```bash
    npm run start
    ```
5. Load MetaSchool Crypto Wallet Extension in Chrome:
    - Open Chrome and go to Extensions (three dots > More Tools > Extensions).
    - Enable Developer mode (toggle at the top).
    - Click Load unpacked, and select the folder where the MetaSchool Crypto Wallet project is located.
    - The extension will now appear in your Chrome toolbar.
    - Now you can use the Crypto Wallet

## Screenshots


<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/3c987d50-79e2-4109-96a5-2be62ea06b50" alt="Screenshot 9" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/5b10bd98-3cf7-4b2e-a5d9-36c87e4feb20" alt="Screenshot 1" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/e07ba4cd-a30b-4c0b-abf9-64e67e9b3c15" alt="Screenshot 2" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/992418a1-5430-4466-8783-f240bede0140" alt="Screenshot 3" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/4f63bb44-5c9a-4080-abe0-62016b6e78af" alt="Screenshot 9" width="150"></td>
    
  </tr>

  <tr>
    <td><img src="https://github.com/user-attachments/assets/b2f3e415-14e7-45af-8be7-dafd7e1334a2" alt="Screenshot 7" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/e1de202b-973d-42a6-967a-be565dd1c0a1" alt="Screenshot 4" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/0deb305a-8360-4b38-b399-0057bb12c31e" alt="Screenshot 5" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/4ff40f44-903f-431c-a26a-37713cc5c1012" alt="Screenshot 6" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/8a2c32c6-b903-42ba-b82f-697bc2809199" alt="Screenshot 8" width="150"></td>
  </tr>


</table>




## Contributing

We love contributions! Here's how you can help make the Crypto Wallet even better:

1. Fork the project (`git repo fork https://github.com/0xmetaschool/crypto-wallet.git`)
2. Create your feature branch (`git checkout -b New_Feature`)
3. Commit your changes (`git commit -m 'Added New Feature'`)

## Contact

Please open an issue in the GitHub repository for any queries or support.
