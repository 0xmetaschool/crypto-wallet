// console.log('Script started'); // Debug: Check if script is loaded at all

function handleTabSwitch(tabId) {
    // console.log('Switching to tab:', tabId);
    


    document.getElementById("add_New_Account").addEventListener("click", addAcount);



    // Get the tab elements
    const assetsTab = document.getElementById('open_assets');
    const activityTab = document.getElementById('open_activity');
    
    // Get the content elements
    const assetsContent = document.getElementById('assets');
    const activityContent = document.getElementById('activity');
    
    // Remove active class from all tabs
    document.querySelectorAll('.home_tabs p').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Hide all content sections
    assetsContent.style.display = 'none';
    activityContent.style.display = 'none';
    
    // Clear update interval when switching away from activity tab
    if (tabId !== 'open_activity' && window.activityUpdateInterval) {
        clearInterval(window.activityUpdateInterval);
    }
    
    // Show the appropriate content based on which tab was clicked
    if (tabId === 'open_assets') {
        assetsTab.classList.add('active');
        assetsContent.style.display = 'block';
    } else if (tabId === 'open_activity') {
        activityTab.classList.add('active');
        activityContent.style.display = 'block';
        Activity_History(); // Load activity history when switching to activity tab
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // console.log('DOMContentLoaded fired'); // Debug: Check if event fires
    
    // Debug: Log all important elements at startup
    // console.log('Initial elements check:', {
    //     settingsIcon: document.getElementById('settings_menu_icon'),
    //     settingsMenu: document.getElementById('settings_menu'),
    //     headerMenu: document.querySelector('.header_menu')
    // });

    // Your existing event listeners
    document.getElementById("userAddress").addEventListener("click", copyAddress);
    document.getElementById("transferFund").addEventListener("click", handler);
    document.getElementById("header_network").addEventListener("click", getOpenNetwork);
    document.getElementById("login_up").addEventListener("click", login);
    document.getElementById("logout").addEventListener("click", logout);

    // Debug: Add test click handler to document
    document.addEventListener('click', function(e) {
        // console.log('Click detected on:', {
        //     element: e.target,
        //     tagName: e.target.tagName,
        //     id: e.target.id,
        //     parent: e.target.parentElement
        // });
    });

    // Your existing settings icon code with added debugging
    const settingsIcon = document.getElementById('settings_menu_icon');
    // console.log('Settings icon element:', settingsIcon);

    if (settingsIcon) {
        // console.log('Adding click listener to settings icon');
        settingsIcon.addEventListener('click', function(e) {
            // console.log('Settings icon clicked!', {
            //     target: e.target,
            //     currentTarget: e.currentTarget
            // });
            e.preventDefault();
            e.stopPropagation();
            openDropdownMenu();
        });

        // Debug: Add mouseover listener
        settingsIcon.addEventListener('mouseover', function() {
            // console.log('Mouse over settings icon');
        });
    } else {
        console.error('Settings icon not found');
    }

    // Your existing document click handler with debug
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('settings_menu');
        const icon = document.getElementById('settings_menu_icon');
        // console.log('Document click:', {
        //     target: e.target,
        //     menuContains: menu ? menu.contains(e.target) : false,
        //     iconContains: icon ? icon.contains(e.target) : false
        // });
        if (!menu.contains(e.target) && !icon.contains(e.target)) {
            menu.style.display = 'none';
        }
    });

    // Your existing openDropdownMenu function with debug
    function openDropdownMenu() {
        // console.log('openDropdownMenu called');
        const menuElement = document.getElementById("settings_menu");
        // console.log('Menu element:', menuElement);
        // console.log('Current display:', menuElement.style.display);
        
        if (menuElement.style.display === "block") {
            menuElement.style.display = "none";
        } else {
            menuElement.style.display = "block";
        }
        // console.log('New display:', menuElement.style.display);
    }

    // Fix the close button handler
    const closeBtn = document.getElementById("close_network");
    if (closeBtn) {
        // console.log('Close button found, adding listener');
        closeBtn.addEventListener("click", function(e) {
            // console.log('Close button clicked');
            e.preventDefault();
            e.stopPropagation();
            
            // Directly manipulate the display properties
            document.getElementById("network").style.display = "none";
            document.getElementById("userAddress").style.display = "block";
            
            // console.log('Network display:', document.getElementById("network").style.display);
            // console.log('UserAddress display:', document.getElementById("userAddress").style.display);
        });
    } else {
        console.error('Close button not found');
    }

    // Update network item click handler
    const networkList = document.getElementById("network_item");
    if (networkList) {
        // console.log('Network list found, adding listeners');
        networkList.addEventListener("click", function(e) {
            // console.log('Network item clicked:', e.target);
            
            // Find the closest network_item parent or the element itself
            const networkItem = e.target.closest('.network_item') || e.target;
            
            // Get the span text regardless of what was clicked
            const span = networkItem.querySelector('span');
            if (span) {
                // console.log('Network text found:', span.textContent);
                
                // Create a new event with the correct target
                const newEvent = {
                    target: networkItem,
                    preventDefault: () => {},
                    stopPropagation: () => {}
                };
                
                getSelectedNetwork(newEvent);
            } else {
                console.log('No span found in network item');
            }
        });
    } else {
        console.error('Network list not found');
    }

    // Fix the send button click handler
    const transferButton = document.getElementById("open_Transfer");
    if (transferButton) {
        // console.log('Transfer button found');
        
        // Add click handler to both the div and its child image
        transferButton.addEventListener("click", function(e) {
            // console.log('Transfer button clicked');
            e.preventDefault();
            e.stopPropagation();
            openTransfer();
        });

        // Also handle clicks on the image
        const transferImage = transferButton.querySelector('.home_features_img');
        if (transferImage) {
            transferImage.addEventListener("click", function(e) {
                // console.log('Transfer image clicked');
                e.preventDefault();
                e.stopPropagation();
                openTransfer();
            });
        }
    } else {
        console.error('Transfer button not found');
    }

    // Fix back button handler
    const backBtn = document.getElementById("goBack");
    if (backBtn) {
        // console.log('Back button found');
        backBtn.addEventListener("click", function(e) {
            // console.log('Back button clicked');
            e.preventDefault();
            e.stopPropagation();
            goBack();
        });
    } else {
        console.error('Back button not found');
    }

    // Fix the account button click handler
    const accountButton = document.getElementById("openAccountImport");
    if (accountButton) {
        // console.log('Account button found');
        
        // Add click handler to both the div and its child image
        accountButton.addEventListener("click", function(e) {
            // console.log('Account button clicked');
            e.preventDefault();
            e.stopPropagation();
            openImportModel();
        });

        // Also handle clicks on the image
        const accountImage = accountButton.querySelector('.home_features_img');
        if (accountImage) {
            accountImage.addEventListener("click", function(e) {
                // console.log('Account image clicked');
                e.preventDefault();
                e.stopPropagation();
                openImportModel();
            });
        }
    } else {
        console.error('Account button not found');
    }

    // Fix the close account import button
    const closeAccountBtn = document.getElementById("close_import_account");
    if (closeAccountBtn) {
        // console.log('Close account button found');
        closeAccountBtn.addEventListener("click", function(e) {
            // console.log('Close account button clicked');
            e.preventDefault();
            e.stopPropagation();
            closeImportModel();
        });
    } else {
        console.error('Close account button not found');
    }

    // Fix the import token button click handler
    const importButton = document.getElementById("open_Import");
    if (importButton) {
        // console.log('Import button found');
        
        // Add click handler to both the div and its child image
        importButton.addEventListener("click", function(e) {
            // console.log('Import button clicked');
            e.preventDefault();
            e.stopPropagation();
            openImport();
        });

        // Also handle clicks on the image
        const importImage = importButton.querySelector('.home_features_img');
        if (importImage) {
            importImage.addEventListener("click", function(e) {
                // console.log('Import image clicked');
                e.preventDefault();
                e.stopPropagation();
                openImport();
            });
        }
    } else {
        console.error('Import button not found');
    }

    // Fix the import back button
    const importBackBtn = document.getElementById("goBack_import");
    if (importBackBtn) {
        // console.log('Import back button found');
        importBackBtn.addEventListener("click", function(e) {
            // console.log('Import back button clicked');
            e.preventDefault();
            e.stopPropagation();
            importGoBack();
        });
    } else {
        console.error('Import back button not found');
    }

    // Set up tab click handlers
    document.querySelectorAll('.home_tabs p').forEach(tab => {
        tab.addEventListener('click', function() {
            handleTabSwitch(this.id);
        });
    });

    // Set default active tab
    handleTabSwitch('open_assets');

    // Add settings menu item click handler
    const settingsMenuItem = document.getElementById('settings');
    if (settingsMenuItem) {
        settingsMenuItem.addEventListener('click', function(e) {
            // console.log('Settings menu item clicked');
            e.preventDefault();
            e.stopPropagation();
            openSettingsWindow();
        });
    }

    // Add settings item click handlers
    const settingsImportAccount = document.getElementById('settings_import_account');
    if (settingsImportAccount) {
        settingsImportAccount.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openImportModel();
            // Hide settings window when opening import account
            document.getElementById('settings_window').style.display = 'none';
        });
    }

    const settingsImportToken = document.getElementById('settings_import_token');
    if (settingsImportToken) {
        settingsImportToken.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openImport();
            // Hide settings window when opening import token
            document.getElementById('settings_window').style.display = 'none';
        });
    }

    // Update close settings handler
    const closeSettingsBtn = document.getElementById('close_settings');
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('settings_window').style.display = 'none';
            document.getElementById('home').style.display = 'block';
        });
    }

    // Update the receive button handler
    const receiveButton = document.getElementById('open_receive');
    if (receiveButton) {
        // console.log('Receive button found');
        receiveButton.addEventListener('click', function(e) {
            // console.log('Receive button clicked');
            e.preventDefault();
            e.stopPropagation();
            openReceive();
        });
    } else {
        console.error('Receive button not found');
    }

    // Add close receive modal handler
    const closeReceiveButton = document.getElementById('close_receive');
    if (closeReceiveButton) {
        // console.log('Close receive button found');
        closeReceiveButton.addEventListener('click', function(e) {
            // console.log('Close receive button clicked');
            e.preventDefault();
            e.stopPropagation();
            closeReceiveModal();
        });
    } else {
        console.error('Close receive button not found');
    }

    // Add receive back button handler
    const receiveBackButton = document.getElementById('goBack_receive');
    if (receiveBackButton) {
        // console.log('Receive back button found');
        receiveBackButton.addEventListener('click', function(e) {
            // console.log('Receive back button clicked');
            e.preventDefault();
            e.stopPropagation();
            receiveGoBack();
        });
    }

    // Add copy address handler
    const copyAddressButton = document.getElementById('copy_address');
    if (copyAddressButton) {
        // console.log('Copy address button found');
        copyAddressButton.addEventListener('click', function(e) {
            // console.log('Copy address button clicked');
            e.preventDefault();
            e.stopPropagation();
            const addressElement = document.getElementById('receive_address');
            if (addressElement) {
                navigator.clipboard.writeText(addressElement.textContent)
                    .then(() => {
                        copyAddressButton.textContent = 'Copied!';
                        setTimeout(() => {
                            copyAddressButton.textContent = 'Copy Address';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy address:', err);
                    });
            }
        });
    }

    // Add copy icon click handler
    const copyIcon = document.getElementById('address_info_container');
    if (copyIcon) {
        copyIcon.addEventListener('click', function() {
            if (address) {  // Make sure we have an address to copy
                navigator.clipboard.writeText(address)
                    .then(() => {
                        // Update tooltip text temporarily
                        copyIcon.setAttribute('data-hover-text', 'Address copied!');
                        
                        // Reset tooltip text after 2 seconds
                        setTimeout(() => {
                            copyIcon.setAttribute('data-hover-text', 'Copy to clipboard');
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy address:', err);
                        copyIcon.setAttribute('data-hover-text', 'Failed to copy');
                    });
            }
        });
    }

    // Add click handler for the entire container
    const addressContainer = document.getElementById('address_container');
    if (addressContainer) {
        addressContainer.addEventListener('click', function() {
            if (address) {  // Make sure address variable is defined
                navigator.clipboard.writeText(address)
                    .then(() => {
                        // Update tooltip text temporarily
                        addressContainer.setAttribute('data-hover-text', 'Address copied!');
                        
                        // Reset tooltip text after 2 seconds
                        setTimeout(() => {
                            addressContainer.setAttribute('data-hover-text', 'Copy to clipboard');
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy address:', err);
                        addressContainer.setAttribute('data-hover-text', 'Failed to copy');
                    });
            }
        });
    }

    // Initialize active network
    initializeActiveNetwork();

    // Add MAX button click handler
    const maxButton = document.querySelector('.max_button');
    if (maxButton) {
        maxButton.addEventListener('click', handleMaxAmount);
    }

    // Add event listener for "Create Account" link
    const createAccountLink = document.getElementById("accountCreate");
    if (createAccountLink) {
        createAccountLink.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            createUser(); // Call createUser directly to show the form
        });
    }

    // Also add event listener for "Login" link in create account screen
    const loginAccountLink = document.getElementById("loginAccount");
    if (loginAccountLink) {
        loginAccountLink.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById("createAccount").style.display = "none";
            document.getElementById("LoginUser").style.display = "block";
        });
    }

    // Add event listener for "Create Account" button
    const openCreateButton = document.getElementById("openCreate");
    if (openCreateButton) {
        openCreateButton.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            openCreate(); // Call openCreate directly
        });
    }

    // Add event listener for Sign Up button
    const signUpButton = document.getElementById("sign_up");
    if (signUpButton) {
        signUpButton.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            signUp();
        });
    }

    // Add copy functionality for wallet details
    document.querySelectorAll('.copy_button').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.clipboard;
            let textToCopy = '';
            
            switch(type) {
                case 'address':
                    textToCopy = document.getElementById('createdAddress').textContent;
                    break;
                case 'privateKey':
                    textToCopy = document.getElementById('createdPrivateKey').textContent;
                    break;
                case 'mnemonic':
                    textToCopy = document.getElementById('createdMnmonic').textContent;
                    break;
            }

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Add copied class for visual feedback
                this.classList.add('copied');
                const originalText = this.innerHTML;
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copied!
                `;
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text:', err);
            });
        });
    });

    // Add event listener for the "Go Back" button
    const goBackButton = document.getElementById("goHomePage");
    if (goBackButton) {
        goBackButton.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            goBackToLogin();
        });
    }

    // Add event listener for the back button in create account form
    const goBackToLoginBtn = document.getElementById("goBackToLogin");
    if (goBackToLoginBtn) {
        goBackToLoginBtn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            goBackToLogin();
        });
    }
});

// Keep all your existing code below this point
let POLYGON = "https://rpc.ankr.com/polygon";
let POLYGON_AMOY = "https://rpc.ankr.com/polygon_amoy";
let ETHEREUM = "https://rpc.ankr.com/eth";
let SEPOLIA_TEST = "https://rpc.ankr.com/eth_sepolia";
let BNB_Smart_chain = "https://rpc.ankr.com/bsc";

let providerURL = "https://rpc.ankr.com/eth";

let privateKey;
let address;

let allToken = 
[
  {
    name: "MATIC",
    address: "0x0000000000000000000000000000000000001010",
    symbol: "MATIC",
  }
];

//_______________________________________________________________________________________________________________________________________

let Activity_History = async () => {
    let str = localStorage.getItem("userWallet");
    let parsedObj = JSON.parse(str);
    let connect_account_address = parsedObj.address;

    try {
        const response = await fetch("http://localhost:3000/api/v1/transactions/");
        const data = await response.json();
        let transactions = data.data.Transaction_;

        if (!Array.isArray(transactions)) {
            throw new Error("Expected an array but got: " + typeof transactions);
        }

        let activityContainer = document.getElementById("activity");
        activityContainer.innerHTML = ''; // Clear existing content

        // Filter and sort transactions by timestamp
        let filteredTransactions = transactions
            .filter(transaction => {
                return (
                    transaction.Network.toLowerCase() == providerURL.toLowerCase() 
                    && (
                        transaction.Sender_address.toLowerCase() === address.toLowerCase() 
                        || transaction.Receiver_address.toLowerCase() === address.toLowerCase()
                    )
                );
            })
            .sort((a, b) => {
                // Convert ISO timestamps to Unix timestamps (milliseconds)
                const timeA = new Date(a.timestamp).getTime();
                const timeB = new Date(b.timestamp).getTime();
                return timeB - timeA; // Sort newest to oldest
            });

        // console.log(filteredTransactions);

        // Group transactions by date first
        let currentDate = null;
        
        // Create transaction elements
        filteredTransactions.forEach(transaction => {
            try {
                const date = new Date(transaction.timestamp);
                const dateStr = date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                });

                // Add date header if it's a new date
                if (dateStr !== currentDate) {
                    currentDate = dateStr;
                    const dateHeader = document.createElement('div');
                    dateHeader.classList.add('activity_date_header');
                    dateHeader.textContent = dateStr;
                    activityContainer.appendChild(dateHeader);
                }

                let explorerUrl = getExplorerUrl(transaction.Hash);
                let isSent = transaction.Sender_address.toLowerCase() === address.toLowerCase();
                
                let transactionElement = document.createElement('div');
                transactionElement.classList.add('activity_transaction');
                transactionElement.innerHTML = `
                    <div class="activity_item ${isSent ? 'sent' : 'received'}">
                        <div class="activity_left">
                            <div class="activity_icon ${isSent ? 'sent' : 'received'}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    ${isSent ? 
                                        '<path d="M12 19V5M5 12l7-7 7 7"/>' : 
                                        '<path d="M12 5v14M5 12l7 7 7-7"/>'
                                    }
                                </svg>
                            </div>
                            <div class="activity_details">
                                <div class="activity_type">${isSent ? 'Sent' : 'Received'}</div>
                                <div class="activity_address">${formatAddress(isSent ? transaction.Receiver_address : transaction.Sender_address)}</div>
                            </div>
                        </div>
                        <div class="activity_time">
                            ${date.toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit',
                                hour12: true 
                            })}
                        </div>
                    </div>
                `;

                transactionElement.addEventListener('click', () => {
                    window.open(explorerUrl, '_blank');
                });

                activityContainer.appendChild(transactionElement);
            } catch (error) {
                console.error('Error creating transaction element:', error, transaction);
            }
        });

        if (filteredTransactions.length === 0) {
            activityContainer.innerHTML = `
                <div class="empty_state">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                    </svg>
                    <p>No transactions yet</p>
                </div>
            `;
        }

        // Set up live updates
        setupLiveUpdates();

    } catch (error) {
        console.error("Error fetching transactions:", error);
        document.getElementById("activity").innerHTML = `
            <div class="empty_state">
                <p>Error loading transactions</p>
            </div>
        `;
    }
};

// New function to format both date and time
function formatDateTime(date) {
    try {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return 'Unknown time';
        }
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(date);
    } catch (error) {
        console.error('Error formatting date/time:', error);
        return 'Unknown time';
    }
}

// Helper functions
function getExplorerUrl(hash) {
    switch(providerURL) {
        case POLYGON: return `https://polygonscan.com/tx/${hash}`;
        case POLYGON_AMOY: return `https://amoy.polygonscan.com/tx/${hash}`;
        case ETHEREUM: return `https://etherscan.io/tx/${hash}`;
        case SEPOLIA_TEST: return `https://sepolia.etherscan.io/tx/${hash}`;
        case BNB_Smart_chain: return `https://bscscan.com/tx/${hash}`;
        default: return '';
    }
}

function formatAddress(address) {
    return `${address.slice(0,6)}...${address.slice(-4)}`;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };
    
    for (let [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
    }
    return 'Just now';
}

// Set up live updates
function setupLiveUpdates() {
    // Clear any existing interval
    if (window.activityUpdateInterval) {
        clearInterval(window.activityUpdateInterval);
    }

    // Update activity every 30 seconds
    window.activityUpdateInterval = setInterval(() => {
        if (document.getElementById('activity').style.display === 'block') {
            Activity_History();
        }
    }, 30000); // 30 seconds
}

//_______________________________________________________________________________________________________________________________________

function handler() {
    const amount = document.getElementById("amount").value;
    const toAddress = document.getElementById("address").value;
    
    // Show confirmation dialog
    showConfirmationDialog(amount, toAddress);
}

function showConfirmationDialog(amount, toAddress) {
    const dialog = document.getElementById("confirmation_dialog");
    const transferForm = document.getElementById("transfer_form");
    
    // Update confirmation dialog details
    document.getElementById("confirm_from").textContent = `${address.slice(0,6)}...${address.slice(-4)}`;
    document.getElementById("confirm_to").textContent = `${toAddress.slice(0,6)}...${toAddress.slice(-4)}`;
    document.getElementById("confirm_amount").textContent = `${amount} ${getNetworkSymbol()}`;
    
    // Show dialog
    dialog.style.display = "block";
    transferForm.style.display = "none";
    
    // Add event listeners
    document.getElementById("close_confirmation").addEventListener("click", closeConfirmationDialog);
    document.getElementById("reject_transaction").addEventListener("click", closeConfirmationDialog);
    document.getElementById("confirm_transaction").addEventListener("click", () => executeTransaction(amount, toAddress));
}

function closeConfirmationDialog() {
    const dialog = document.getElementById("confirmation_dialog");
    const transferForm = document.getElementById("transfer_form");
    
    dialog.style.display = "none";
    transferForm.style.display = "block";
}

function getNetworkSymbol() {
    switch(providerURL) {
        case POLYGON: return "MATIC";
        case ETHEREUM: return "ETH";
        case SEPOLIA_TEST: return "SepoliaETH";
        case BNB_Smart_chain: return "BNB";
        case POLYGON_AMOY: return "MATIC";
        default: return "ETH";
    }
}

async function executeTransaction(amount, toAddress) {
    // Get elements and check if they exist
    const transferCenter = document.getElementById("transfer_center");
    const confirmationDialog = document.getElementById("confirmation_dialog");
    const transferForm = document.getElementById("transfer_form");
    const home = document.getElementById("home");
    
    if (!transferCenter || !confirmationDialog || !transferForm || !home) {
        console.error('Required elements not found:', {
            transferCenter: !!transferCenter,
            confirmationDialog: !!confirmationDialog,
            transferForm: !!transferForm,
            home: !!home
        });
        alert('Something went wrong. Please try again.');
        return;
    }

    // Show loading state
    transferCenter.style.display = "flex";
    confirmationDialog.style.display = "none";
    
    const provider = new ethers.providers.JsonRpcProvider(providerURL);
    const wallet = new ethers.Wallet(privateKey, provider);
    
    try {
        const tx = {
            to: toAddress,
            value: ethers.utils.parseEther(amount),
            gasLimit: ethers.utils.hexlify(21000),
        };
        
        const txResponse = await wallet.sendTransaction(tx);
        // console.log('Transaction response:', txResponse);
        
        // Hide loading state
        transferCenter.style.display = "none";
        
        // Set explorer link based on network
        const link = document.getElementById("link");
        if (link) {
            link.href = getExplorerUrl(txResponse.hash);
            link.style.display = "block";
        }
        
        // Log transaction
        try {
            const url = "http://localhost:3000/api/v1/transactions/log";
            const data = {
                Sender_address: wallet.address,
                Receiver_address: toAddress,
                amount: amount,
                Network: providerURL,
                Hash: txResponse.hash,
                timestamp: new Date().toISOString() // Use current timestamp
            };
            
            await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
        } catch (logError) {
            console.error('Error logging transaction:', logError);
            // Continue even if logging fails
        }
        
        // Update UI
        transferForm.style.display = "none";
        home.style.display = "block";
        
        // Update balance
        checkBlance(wallet.address);
        
        // Refresh assets list
        myFunction();
        
        // Show success message
        const userAddress = document.getElementById("userAddress");
        if (userAddress) {
            const originalText = userAddress.getAttribute("data-hover-text");
            userAddress.setAttribute("data-hover-text", "Transaction successful!");
            setTimeout(() => {
                userAddress.setAttribute("data-hover-text", originalText);
            }, 3000);
        }
        
    } catch (error) {
        console.error("Transaction failed:", error);
        transferCenter.style.display = "none";
        alert("Transaction failed: " + (error.message || 'Unknown error'));
    }
}

// Helper function to get explorer URL
function getExplorerUrl(hash) {
    const explorers = {
        [POLYGON]: `https://polygonscan.com/tx/${hash}`,
        [POLYGON_AMOY]: `https://amoy.polygonscan.com/tx/${hash}`,
        [ETHEREUM]: `https://etherscan.io/tx/${hash}`,
        [SEPOLIA_TEST]: `https://sepolia.etherscan.io/tx/${hash}`,
        [BNB_Smart_chain]: `https://bscscan.com/tx/${hash}`
    };
    return explorers[providerURL] || '';
}

//_______________________________________________________________________________________________________________________________________

function checkBlance(address) 
{
    let provider = new ethers.providers.JsonRpcProvider(providerURL);
    provider.getBalance(address).then((balance) => 
    {
        let balanceInEth = ethers.utils.formatEther(balance);
  
        let symbol = "symbol";
        if     (providerURL == POLYGON)               {symbol = "POL";}
        else if(providerURL == POLYGON_AMOY)          {symbol = "POL";}
        else if(providerURL == ETHEREUM)              {symbol = "ETH";}
        else if(providerURL == SEPOLIA_TEST)          {symbol = "SepoliaETH";}
        else if(providerURL == BNB_Smart_chain)       {symbol = "BNB";}
        else                                          {symbol = "symbol";}
  
        document.getElementById("accountBlance").innerHTML = `${balanceInEth} ${symbol}`;
        document.getElementById("userAddress").innerHTML = `${address.slice(0,6)}...${address.slice(36,42)}`;
    });
}

//_______________________________________________________________________________________________________________________________________

function getOpenNetwork() 
{
    let networkElement = document.getElementById("network");
    // Toggle the display
    if (networkElement.style.display === "block") {
        networkElement.style.display = "none";
        document.getElementById("userAddress").style.display = "block";
    } else {
        networkElement.style.display = "block";
        document.getElementById("userAddress").style.display = "none";
    }
}

function openDropdownMenu() 
{
    let menuElement = document.getElementById("settings_menu");
    // Toggle the display
    if (menuElement.style.display === "block") {
        menuElement.style.display = "none";
    } else {
        menuElement.style.display = "block";
    }
}

//_______________________________________________________________________________________________________________________________________
  
function getSelectedNetwork(e) {
    // console.log('getSelectedNetwork called', e.target);
    
    // Get the network item text
    let networkText;
    const targetElement = e.target;
    
    const networkItem = targetElement.closest('.network_item');
    if (!networkItem) {
        console.log('No network item found');
        return;
    }

    const span = networkItem.querySelector('span');
    if (span) {
        networkText = span.textContent.trim();
        // console.log('Found network text:', networkText);
        
        // Remove active class from all network items
        document.querySelectorAll('.network_item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to selected network
        networkItem.classList.add('active');
        
        // Update header text
        let element = document.getElementById("selected_network");
        if (element) {
            element.innerHTML = networkText;
        }

        // Update provider URL and store network info
        let networkUrl;
        switch (networkText) {
            case "Ethereum Mainnet":
                networkUrl = ETHEREUM;
                break;
            case "Polygon Mainnet":
                networkUrl = POLYGON;
                break;
            case "Polygon Amoy":
                networkUrl = POLYGON_AMOY;
                break;
            case "Sepolia test network":
                networkUrl = SEPOLIA_TEST;
                break;
            case "BNB Smart Chain":
                networkUrl = BNB_Smart_chain;
                break;
            default:
                console.log('Unknown network:', networkText);
                return;
        }

        // Update provider URL
        providerURL = networkUrl;
        
        // Store network preference
        localStorage.setItem("ACTIVE_NETWORK", networkText);
        localStorage.setItem("ACTIVE_NETWORK_URL", networkUrl);

        // Hide network selector and show address
        const networkElement = document.getElementById("network");
        const userAddressElement = document.getElementById("userAddress");
        
        if (networkElement) networkElement.style.display = "none";
        if (userAddressElement) userAddressElement.style.display = "block";

        // Update balance and assets
        let str = localStorage.getItem("userWallet");
        let parsedObj = JSON.parse(str);
        if (parsedObj?.address) {
            checkBlance(parsedObj.address);
        }
        
        myFunction();
    } else {
        console.log('No span found in network item');
    }
}
  

//_______________________________________________________________________________________________________________________________________
    
function loginUser() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("LoginUser").style.display = "block";
    document.querySelector(".wallet_info").style.display = "none"; // Hide wallet info
}
  
function createUser() {
    document.getElementById("LoginUser").style.display = "none";
    // Skip showing createAccount screen and directly show create_popUp
    document.getElementById("create_popUp").style.display = "block";
    document.querySelector(".wallet_info").style.display = "none";
    
    // Clear any existing form data
    document.getElementById("sign_up_email").value = '';
    document.getElementById("sign_up_password").value = '';
    
    // Reset form state
    document.getElementById("field").style.display = "block";
    document.getElementById("center").style.display = "none";
    document.getElementById("accountData").style.display = "none";
    document.getElementById("sign_up").style.display = "block";
}
  
function openCreate() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("create_popUp").style.display = "block";
    document.querySelector(".wallet_info").style.display = "none"; // Hide wallet info
    
    // Clear any existing form data
    document.getElementById("sign_up_email").value = '';
    document.getElementById("sign_up_password").value = '';
    
    // Reset form state
    document.getElementById("field").style.display = "block";
    document.getElementById("center").style.display = "none";
    document.getElementById("accountData").style.display = "none";
    document.getElementById("sign_up").style.display = "block";
}
  
function signUp() {
    let email = document.getElementById("sign_up_email").value;
    let password = document.getElementById("sign_up_password").value;

    // Basic validation
    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

    if (!email.includes('@')) {
        alert("Please enter a valid email address");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }

    // Get required elements
    const field = document.getElementById("field");
    const center = document.getElementById("center");
    const signUpButton = document.getElementById("sign_up");
    const accountData = document.getElementById("accountData");

    if (!field || !center || !signUpButton || !accountData) {
        console.error('Required elements not found:', {
            field: !!field,
            center: !!center,
            signUpButton: !!signUpButton,
            accountData: !!accountData
        });
        alert('Something went wrong. Please try again.');
        return;
    }

    // Show loading state
    field.style.display = "none";
    center.style.display = "block";
    signUpButton.style.display = "none";

    // Create new wallet
    let wallet;
    try {
        wallet = ethers.Wallet.createRandom();
        if (!wallet.address) {
            throw new Error('Failed to create wallet');
        }
    } catch (error) {
        console.error("Wallet creation error:", error);
        resetSignUpForm();
        alert("Failed to create wallet. Please try again.");
        return;
    }

    // API CALL
    let url = "http://localhost:3000/api/v1/user/signup";
    let data = {
        name: email.split('@')[0],
        email: email,
        password: password,
        passwordConfirm: password,
        address: wallet.address,
        private_key: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'error') {
            // Check for duplicate email error
            if (result.code === 11000 || result.message?.includes('duplicate')) {
                throw new Error('An account with this email already exists');
            }
            throw new Error(result.message || 'Signup failed');
        }

        // Get elements for displaying wallet info
        const privateKeyElement = document.getElementById("createdPrivateKey");
        const mnemonicElement = document.getElementById("createdMnmonic");
        const goHomeButton = document.getElementById("goHomePage");

        if (!privateKeyElement || !mnemonicElement || !goHomeButton) {
            throw new Error('Required elements for displaying wallet info not found');
        }

        // Update UI with wallet info
        privateKeyElement.textContent = wallet.privateKey;
        mnemonicElement.textContent = wallet.mnemonic.phrase;

        // Hide loading and show account data
        center.style.display = "none";
        accountData.style.display = "block";
        goHomeButton.style.display = "block";

        // Store wallet data
        let userWallet = {
            address: wallet.address,
            private_key: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase,
        };
        localStorage.setItem("userWallet", JSON.stringify(userWallet));
    })
    .catch(error => {
        console.error("Error:", error);
        resetSignUpForm();
        alert(error.message || "Failed to create account. Please try again.");
    });
}

// Helper function to reset the signup form
function resetSignUpForm() {
    const field = document.getElementById("field");
    const center = document.getElementById("center");
    const signUpButton = document.getElementById("sign_up");
    
    if (field) field.style.display = "block";
    if (center) center.style.display = "none";
    if (signUpButton) signUpButton.style.display = "block";
}
  
function login() {
  document.getElementById("login_form").style.display = "none";
  document.getElementById("center").style.display = "block";
  let email = document.getElementById("login_email").value;
  let password = document.getElementById("login_password").value;

  //API CALL
  let url = "http://localhost:3000/api/v1/user/login";
  let data = {
    email: email,
    password: password,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response data
    //   console.log(result.data.user);
      let userWallet = {
        address: result.data.user.address,
        private_key: result.data.user.private_key,
        mnemonic: result.data.user.mnemonic,
      };
      let jsonObj = JSON.stringify(userWallet);
      localStorage.setItem("userWallet", jsonObj);
      window.location.reload();
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error);
    });
  //END OF API CALL
}
  
//_______________________________________________________________________________________________________________________________________
function logout() 
{
    localStorage.removeItem("userWallet");
    window.location.reload();
}
//_______________________________________________________________________________________________________________________________________  
function openTransfer() 
{
    // console.log('openTransfer called');
    const transferForm = document.getElementById("transfer_form");
    const home = document.getElementById("home");
    const walletInfo = document.querySelector(".wallet_info");
    
    if (transferForm && home && walletInfo) {
        // console.log('Showing transfer form, hiding home');
        transferForm.style.display = "block";
        home.style.display = "none";
        walletInfo.style.display = "none";
        
        // Initialize token selector when opening transfer form
        initializeTokenSelector();
        
        // Initialize MAX button
        const maxButton = document.querySelector('.max_button');
        if (maxButton) {
            maxButton.addEventListener('click', handleMaxAmount);
        }
    } else {
        console.error('Transfer form or home element not found');
    }
}
//_______________________________________________________________________________________________________________________________________  
function goBack() {
    // console.log('goBack called');
    const transferForm = document.getElementById("transfer_form");
    const home = document.getElementById("home");
    const walletInfo = document.querySelector(".wallet_info");
    
    if (transferForm && home && walletInfo) {
        // console.log('Hiding transfer form, showing home');
        transferForm.style.display = "none";
        home.style.display = "block";
        walletInfo.style.display = "block";
        
        // Clear the form fields
        document.getElementById("amount").value = "";
        document.getElementById("address").value = "";
        document.getElementById("link").style.display = "none";
    } else {
        console.error('Transfer form or home element not found');
    }
}
//_______________________________________________________________________________________________________________________________________  
function openImport() 
{
    // console.log('openImport called');
    const importToken = document.getElementById("import_token");
    const home = document.getElementById("home");
    const walletInfo = document.querySelector(".wallet_info");
    
    if (importToken && home) {
        console.log('Showing import token, hiding home');
        importToken.style.display = "block";
        home.style.display = "none";
        if (walletInfo) walletInfo.style.display = "none";
    } else {
        console.error('Import token or home element not found');
    }
}
//_______________________________________________________________________________________________________________________________________  
function importGoBack() 
{
    // console.log('importGoBack called');
    const importToken = document.getElementById("import_token");
    const home = document.getElementById("home");
    const walletInfo = document.querySelector(".wallet_info");
    
    if (importToken && home) {
        // console.log('Hiding import token, showing home');
        importToken.style.display = "none";
        home.style.display = "block";
        if (walletInfo) walletInfo.style.display = "block";
        
        // Clear form fields
        document.getElementById("token_address").value = '';
        document.getElementById("token_symbol").value = '';
        document.getElementById("token_name").value = '';
    } else {
        console.error('Import token or home element not found');
    }
}
//_______________________________________________________________________________________________________________________________________  
function openActivity() {
    handleTabSwitch('open_activity');
}
//_______________________________________________________________________________________________________________________________________  
function openAssets() {
    handleTabSwitch('open_assets');
}
//_______________________________________________________________________________________________________________________________________
function goHomePage() 
{
    document.getElementById("create_popUp").style.display = "none";
    document.getElementById("home").style.display = "block";
}
//_______________________________________________________________________________________________________________________________________  
function openImportModel() 
{
    // console.log('openImportModel called');
    const importAccount = document.getElementById("import_account");
    const home = document.getElementById("home");
    
    if (importAccount && home) {
        // console.log('Showing import account, hiding home');
        importAccount.style.display = "block";
        home.style.display = "none";
    } else {
        console.error('Import account or home element not found');
    }
}
//_______________________________________________________________________________________________________________________________________
function closeImportModel() {
    // console.log('closeImportModel called');
    const importAccount = document.getElementById("import_account");
    const settingsWindow = document.getElementById("settings_window");
    
    if (importAccount && settingsWindow) {
        // console.log('Hiding import account, showing settings');
        importAccount.style.display = "none";
        settingsWindow.style.display = "block";
    } else {
        console.error('Import account or settings window not found');
    }
}
//_______________________________________________________________________________________________________________________________________
function addToken() 
{
  let address = document.getElementById("token_address").value;
  let name = document.getElementById("token_name").value;
  let symbol = document.getElementById("token_symbol").value;
  let str = localStorage.getItem("userWallet");
  let parsedObj = JSON.parse(str);
  
  let url = "http://localhost:3000/api/v1/tokens/createtoken";
  let data = 
  {
    name              : name,
    address           : address,
    symbol            : symbol,
    provider          :providerURL,
    connected_account :parsedObj.address
  };

  fetch(url, 
  {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((result) => 
  {
        // Handle the response data
        // console.log(result.data.createToken);
        window.location.reload();
  })
  .catch((error) => 
    {
        console.error("Error:", error);
    });
  //END OF API CALL
}

//_______________________________________________________________________________________________________________________________________
  
function addAcount() 
{
    let privateKey = document.getElementById("add_account_private_key").value;
    let provider = new ethers.providers.JsonRpcProvider(providerURL);
    let wallet = new ethers.Wallet(privateKey, provider);
    
  
    //API CALL
    let url = "http://localhost:3000/api/v1/account/createaccount";
    let data = 
    {
        privateKey: privateKey,
        address   : wallet.address,
    };
  
    fetch(url, 
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((result) => 
    {
        // console.log(result);
        closeImportModel();
        // window.location.reload();
    })
    .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
    });
    //END OF API CALL
}
  
//_______________________________________________________________________________________________________________________________________
    
let fetchTokenBalance = async(tokenAddress,accountAddress) =>
{
    try 
    {
        let provider = new ethers.providers.JsonRpcProvider(providerURL);
        let ERC20_ABI = 
        [
          "function balanceOf(address account) view returns (uint256)",
          "function decimals() view returns (uint8)"
        ];
      
        let tokenContract = new ethers.Contract(tokenAddress,ERC20_ABI ,provider);
      
        // Fetch the token balance
        let balance = await tokenContract.balanceOf(accountAddress)
        let decimals = await tokenContract.decimals();
        let humanReadableBalance = ethers.utils.formatUnits(balance, decimals);
      
        // console.log(`Token Balance: ${humanReadableBalance}`);
        return humanReadableBalance;
    } 
    catch (error) 
    {
      console.error("Error fetching token balance:", error);
      return 0;
    }
}
    
//_______________________________________________________________________________________________________________________________________
    
async function myFunction() {

    initializeNetwork();

    let str = localStorage.getItem("userWallet");
    let parsedObj = JSON.parse(str);

    if (parsedObj?.address) {
        document.getElementById("LoginUser").style.display = "none";
        document.getElementById("home").style.display = "block";
        document.querySelector(".wallet_info").style.display = "block"; // Show wallet info
        privateKey = parsedObj.private_key;
        address = parsedObj.address;
        checkBlance(parsedObj.address);
        
        // Update header image based on current network
        const headerImg = document.querySelector('.home_header_img');
        if (headerImg) {
            headerImg.src = NETWORK_ICONS[providerURL] || DEFAULT_ICON;
            headerImg.alt = getNetworkName(providerURL);
        }
    }else {
        document.querySelector(".wallet_info").style.display = "none"; // Hide wallet info
    }

    let tokenRender = document.querySelector(".assets");
    
    // Create a container for tokens if it doesn't exist
    let tokensContainer = tokenRender.querySelector('.tokens_container');
    if (!tokensContainer) {
        tokensContainer = document.createElement('div');
        tokensContainer.className = 'tokens_container';
        
        // Add the header with import button
        tokenRender.innerHTML = `
            <div class="assets_header">
                <h3>Tokens</h3>
                <button id="import_token_btn" class="import_token_btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="16"/>
                        <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                    Import Token
                </button>
            </div>
        `;
        tokenRender.appendChild(tokensContainer);
    }

    try {
        // Get native token symbol and balance
        let provider = new ethers.providers.JsonRpcProvider(providerURL);
        let nativeBalance = await provider.getBalance(parsedObj.address);
        let nativeSymbol = getNetworkSymbol();
        
        // Clear tokens container
        tokensContainer.innerHTML = '';

        // Add native token with improved layout
        let nativeTokenIcon = NETWORK_ICONS[providerURL] || DEFAULT_ICON;
        let nativeTokenElement = `
            <div class="token_card">
                <img class="token_icon" src="${nativeTokenIcon}" alt="${nativeSymbol}"/>
                <span class="token_symbol">${nativeSymbol}</span>
                <span class="token_balance">${parseFloat(ethers.utils.formatEther(nativeBalance)).toFixed(4)}</span>
            </div>
        `;
        tokensContainer.innerHTML = nativeTokenElement;

        // Fetch and add other tokens
        let tokenResponse = await fetch("http://localhost:3000/api/v1/tokens/alltoken");
        let tokenData = await tokenResponse.json();
        let tokens = tokenData.data.tokens;

        let filteredAsset = tokens.filter(i => 
            i.provider.toLowerCase() === providerURL.toLowerCase()
        );

        if (filteredAsset.length > 0) {
            for (let token of filteredAsset) {
                let balance = await fetchTokenBalance(token.address, parsedObj.address);
                
                let tokenElement = document.createElement('div');
                tokenElement.className = 'token_card';
                tokenElement.innerHTML = `
                    <img class="token_icon" src="${token.avatar || generateTokenAvatar(token.symbol)}" 
                         alt="${token.symbol}" 
                         onerror="this.src='${generateTokenAvatar(token.symbol)}'"/>
                    <span class="token_symbol">${token.symbol}</span>
                    <span class="token_balance">${parseFloat(balance).toFixed(4)}</span>
                `;
                tokensContainer.appendChild(tokenElement);
            }
        }

        // Add click handler for import button
        const importTokenBtn = document.getElementById('import_token_btn');
        if (importTokenBtn) {
            importTokenBtn.addEventListener('click', openImport);
        }

    } catch (error) {
        console.error("Error fetching tokens:", error);
        tokensContainer.innerHTML = `
            <div class="empty_state">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4M12 16h.01"/>
                </svg>
                <p>Error loading tokens</p>
            </div>
        `;
    }








    


    const accountRender = document.querySelector(".accountList");
    try {
        // Fetch all accounts
        const accountResponse = await fetch("http://localhost:3000/api/v1/account/allaccount");
        const accountData = await accountResponse.json();
    
        let accounts = "";
        accountData.data.accounts.map((account, i) => {
          accounts += `
            <div class="lists">
              <p>${i + 1}</p>
              <p class="accountValue" data-address="${account.address}" data-privateKey="${account.privateKey}">
              Account ${i}
              </p>
            </div>
          `;
        });
    
        accountRender.innerHTML = accounts;
    
        // Add event listeners to each account after rendering
        const accountElements = document.querySelectorAll(".lists");
        accountElements.forEach((element) => {
          element.addEventListener("click", function () {
            changeAccount(element);
          });
        });
    
      } 
      catch (error) {
        console.error("Error fetching accounts:", error);
      }
















}
  











//_______________________________________________________________________________________________________________________________________
  
function copyAddress() 
{
    let tooltip = document.getElementById("userAddress");
    //navigator.clipboard.writeText(address);
    // Copy address to clipboard
    navigator.clipboard.writeText(address)
      .then(() => 
      {
        // Change tooltip text to "Address copied"
        tooltip.setAttribute("data-hover-text", "Address copied");
    
        // Reset tooltip text to "Copy to clipboard" after 2 seconds
        setTimeout(() => 
        {
          tooltip.setAttribute("data-hover-text", "Copy to clipboard");
        }, 5000);
      })
      .catch((error) => 
      {
        console.error("Failed to copy address:", error);
      });
}
  
//_______________________________________________________________________________________________________________________________________
  
function changeAccount(element) 
{
    let data = element.querySelector(".accountValue");
    let address = data.getAttribute("data-address");
    let privateKey = data.getAttribute("data-privateKey");
  
    // console.log(privateKey, address);
    let userWallet = 
    {
      address    : address,
      private_key: privateKey,
      mnemonic   : "Changed",
    };
  
    // console.log(userWallet);
    let jsonObj = JSON.stringify(userWallet);
    localStorage.setItem("userWallet", jsonObj);
    window.location.reload();
}
//_______________________________________________________________________________________________________________________________________
  
window.onload = myFunction;
//_______________________________________________________________________________________________________________________________________
  
document.addEventListener('DOMContentLoaded', function() 
{
    let assetsButton = document.getElementById('open_assets'); // Set the "Assets" button as active by default
    assetsButton.classList.add('active');
    handleTabSwitch('open_assets'); // Show the "Assets" section by default
});

//_______________________________________________________________________________________________________________________________________
  
document.querySelectorAll('.home_tabs p').forEach(button => 
{
    button.addEventListener('click', function() 
    {
        document.querySelectorAll('.home_tabs p').forEach(b => b.classList.remove('active'));// Remove 'active' class from all buttons
        this.classList.add('active');// Add 'active' class to the clicked button
        let id = this.id;// Now display the corresponding data (Assets, Logout, Activity)
        handleTabSwitch(id);
    });
});


//_______________________________________________________________________________________________________________________________________
  
// function setNetwork() { document.getElementById("network").style.display = "none";}

//_______________________________________________________________________________________________________________________________________
  

// function handleTabSwitch(tabId) {
//   let assetsDiv = document.getElementById('assets');
//   let activityDiv = document.querySelector('.activity');
//   let logoutDiv = document.querySelector('.logout'); // Assuming there's a logout div
  
//   // Hide all sections
//   assetsDiv.style.display = 'none';
//   activityDiv.style.display = 'none';
//   logoutDiv.style.display = 'none';
  
//   // Show the appropriate section based on the tab clicked
//   if (tabId === 'open_assets') {
//     assetsDiv.style.display = 'block';
//   } else if (tabId === 'open_activity') {
//     activityDiv.style.display = 'block';
//   } else if (tabId === 'logout') {
//     logoutDiv.style.display = 'block';
//   }
// }


//_______________________________________________________________________________________________________________________________________
  
// Add this to your existing code
function initializeTokenSelector() {
    const tokenSelector = document.getElementById('token_selector');
    const tokenList = document.getElementById('token_list');
    const selectedToken = tokenSelector.querySelector('.selected_token');

    // Populate token list
    updateTokenList();
    
    // Toggle token list
    selectedToken.addEventListener('click', () => {
        const isVisible = tokenList.style.display === 'block';
        tokenList.style.display = isVisible ? 'none' : 'block';
    });

    // Close token list when clicking outside
    document.addEventListener('click', (e) => {
        if (!tokenSelector.contains(e.target)) {
            tokenList.style.display = 'none';
        }
    });
}

async function updateTokenList() {
    const tokenList = document.getElementById('token_list');
    const provider = new ethers.providers.JsonRpcProvider(providerURL);
    
    // Get native token symbol and balance
    let nativeSymbol = "ETH";
    switch(providerURL) {
        case POLYGON: nativeSymbol = "MATIC"; break;
        case ETHEREUM: nativeSymbol = "ETH"; break;
        case SEPOLIA_TEST: nativeSymbol = "SepoliaETH"; break;
        case BNB_Smart_chain: nativeSymbol = "BNB"; break;
        case POLYGON_AMOY: nativeSymbol = "MATIC"; break;
    }

    // Get native balance
    const balance = await provider.getBalance(address);
    const nativeBalance = ethers.utils.formatEther(balance);

    // Update native token in list
    const nativeTokenIcon = NETWORK_ICONS[providerURL] || DEFAULT_ICON;
    const nativeTokenHtml = `
        <div class="token_item native_token" data-symbol="${nativeSymbol}" data-address="native">
            <img class="token_icon" src="${nativeTokenIcon}" alt="${nativeSymbol}"/>
            <div class="token_info">
                <span class="token_balance">${parseFloat(nativeBalance).toFixed(6)} ${nativeSymbol}</span>
            </div>
        </div>
    `;

    // Get other tokens
    try {
        const tokenResponse = await fetch("http://localhost:3000/api/v1/tokens/alltoken");
        const tokenData = await tokenResponse.json();
        const tokens = tokenData.data.tokens.filter(t => 
            t.provider.toLowerCase() === providerURL.toLowerCase()
        );

        let tokenListHtml = nativeTokenHtml;
        
        for (const token of tokens) {
            const balance = await fetchTokenBalance(token.address, address);
            tokenListHtml += `
                <div class="token_item" data-symbol="${token.symbol}" data-address="${token.address}">
                    <img class="token_icon" src="${generateTokenAvatar(token.symbol)}" alt="${nativeSymbol}"/>
                    <div class="token_info">
                        <span class="token_balance">${parseFloat(balance).toFixed(6)} ${token.symbol}</span>
                    </div>
                </div>
            `;
        }

        tokenList.innerHTML = tokenListHtml;

        // Add click handlers for token selection
        tokenList.querySelectorAll('.token_item').forEach(item => {
            item.addEventListener('click', () => {
                const symbol = item.dataset.symbol;
                const tokenAddress = item.dataset.address;
                
                // Update selected token display
                const selectedToken = document.querySelector('.selected_token');
                selectedToken.innerHTML = item.innerHTML;
                selectedToken.dataset.symbol = symbol;
                selectedToken.dataset.address = tokenAddress;
                
                tokenList.style.display = 'none';
            });
        });

    } catch (error) {
        console.error('Error updating token list:', error);
    }
}

// Add this function to handle settings menu item click
function openSettingsWindow() {
    // console.log('Opening settings window');
    const home = document.getElementById("home");
    const settingsWindow = document.getElementById("settings_window");
    
    if (settingsWindow && home) {
        settingsWindow.style.display = "block";
        home.style.display = "none";
        
        // Close the dropdown menu
        document.getElementById("settings_menu").style.display = "none";
    }
}

// Update the openReceiveModal function with better error handling
function openReceiveModal() {
    // console.log('Opening receive modal');
    const modal = document.getElementById('receive_modal');
    const addressElement = document.getElementById('receive_address');
    const qrcodeElement = document.getElementById('qrcode');
    const homeElement = document.getElementById('home');
    
    if (!modal || !addressElement || !qrcodeElement || !homeElement) {
        console.error('Required elements not found:', {
            modal: !!modal,
            addressElement: !!addressElement,
            qrcodeElement: !!qrcodeElement,
            homeElement: !!homeElement
        });
        return;
    }
    
    // Clear existing QR code
    qrcodeElement.innerHTML = '';
    
    // Get the current wallet address
    const walletData = JSON.parse(localStorage.getItem('userWallet'));
    if (walletData?.address) {
        // console.log('Generating QR code for address:', walletData.address);
        
        // Display address
        addressElement.textContent = `${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}`;
        
        try {
            // Generate QR code
            new QRCode(qrcodeElement, {
                text: walletData.address,
                width: 180,
                height: 180,
                colorDark: "#27c105",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            
            // Show modal and hide home
            modal.style.display = 'block';
            homeElement.style.display = 'none';
            
            // console.log('Receive modal opened successfully');
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    } else {
        console.error('No wallet address found');
    }
}

// Update close modal function with error handling
function closeReceiveModal() {
    // console.log('Closing receive modal');
    const modal = document.getElementById('receive_modal');
    const home = document.getElementById('home');
    
    if (!modal || !home) {
        console.error('Required elements not found:', {
            modal: !!modal,
            home: !!home
        });
        return;
    }
    
    modal.style.display = 'none';
    home.style.display = 'block';
    console.log('Receive modal closed successfully');
}

function copyReceiveAddress() {
    const walletData = JSON.parse(localStorage.getItem('userWallet'));
    if (walletData?.address) {
        navigator.clipboard.writeText(walletData.address)
            .then(() => {
                const copyButton = document.getElementById('copy_address');
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy Address';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy address:', err);
            });
    }
}

// Add these functions
function openReceive() {
    console.log('Opening receive form');
    const receiveForm = document.getElementById("receive_form");
    const home = document.getElementById("home");
    const qrcodeElement = document.getElementById("qrcode");
    const addressElement = document.getElementById("receive_address");
    const walletInfo = document.querySelector(".wallet_info");
    
    if (!receiveForm || !home || !qrcodeElement || !addressElement) {
        console.error('Required elements not found');
        return;
    }

    // Get the current wallet address
    const walletData = JSON.parse(localStorage.getItem('userWallet'));
    if (walletData?.address) {
        // console.log('Setting up receive form for address:', walletData.address);
        
        // Display full address
        addressElement.textContent = walletData.address;
        
        // Clear and generate QR code
        qrcodeElement.innerHTML = '';
        try {
            new QRCode(qrcodeElement, {
                text: walletData.address,
                width: 200,
                height: 200,
                colorDark : "#27c105",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        } catch (error) {
            console.error('Error generating QR code:', error);
            qrcodeElement.innerHTML = '<p style="color: red;">Error generating QR code</p>';
        }
        
        // Show receive form and hide home and wallet info
        receiveForm.style.display = "block";
        home.style.display = "none";
        if (walletInfo) walletInfo.style.display = "none";

        // Add click handler for copying address
        const copyButton = document.getElementById('copy_address');
        const addressContainer = document.getElementById('receive_address_container');
        
        const copyAddress = () => {
            navigator.clipboard.writeText(walletData.address).then(() => {
                copyButton.innerHTML = '<span>Copied!</span>';
                const successElement = addressContainer.querySelector('.copy_success');
                successElement.classList.add('show');
                
                setTimeout(() => {
                    copyButton.innerHTML = '<span>Copy Address</span>';
                    successElement.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy address:', err);
            });
        };

        copyButton.addEventListener('click', copyAddress);
        addressContainer.addEventListener('click', copyAddress);
    } else {
        console.error('No wallet address found');
    }
}

function receiveGoBack() {
    // console.log('Going back from receive form');
    const receiveForm = document.getElementById("receive_form");
    const home = document.getElementById("home");
    const walletInfo = document.querySelector(".wallet_info");
    
    if (!receiveForm || !home) {
        console.error('Required elements not found');
        return;
    }
    
    receiveForm.style.display = "none";
    home.style.display = "block";
    if (walletInfo) walletInfo.style.display = "block";

    // Remove event listeners
    const copyButton = document.getElementById('copy_address');
    const addressContainer = document.getElementById('receive_address_container');
    copyButton.replaceWith(copyButton.cloneNode(true));
    addressContainer.replaceWith(addressContainer.cloneNode(true));
}

// Add this near the top of your file with other constants
const NETWORK_ICONS = {
    [ETHEREUM]: "./assets/ethereum.png",
    [POLYGON]: "./assets/polygon.png",
    [SEPOLIA_TEST]: "./assets/ethereum.png",
    [BNB_Smart_chain]: "./assets/binance.png",
    [POLYGON_AMOY]: "./assets/polygon.png"
};

// Default fallback icon
const DEFAULT_ICON = "./assets/metaschool_icon.png";

// Add this helper function to get network name
function getNetworkName(url) {
    switch(url) {
        case ETHEREUM: return "Ethereum Mainnet";
        case POLYGON: return "Polygon Mainnet";
        case POLYGON_AMOY: return "Polygon Amoy";
        case SEPOLIA_TEST: return "Sepolia test network";
        case BNB_Smart_chain: return "BNB Smart Chain";
        default: return "Unknown Network";
    }
}

// Update the token import functions
async function validateTokenAddress(address) {
    try {
        if (!ethers.utils.isAddress(address)) {
            throw new Error('Invalid address format');
        }

        const provider = new ethers.providers.JsonRpcProvider(providerURL);
        const ERC20_ABI = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function decimals() view returns (uint8)",
            "function balanceOf(address) view returns (uint256)"
        ];
        
        const contract = new ethers.Contract(address, ERC20_ABI, provider);
        
        // Try to get token details and validate it's a real token
        const [name, symbol, decimals] = await Promise.all([
            contract.name(),
            contract.symbol(),
            contract.decimals()
        ]);
        
        // Additional validation
        if (!name || !symbol || decimals === undefined) {
            throw new Error('Invalid token contract');
        }
        
        // Generate avatar
        const avatar = generateTokenAvatar(symbol);
        
        return { 
            isValid: true, 
            name, 
            symbol,
            decimals,
            avatar
        };
    } catch (error) {
        console.error('Token validation error:', error);
        return { 
            isValid: false, 
            error: error.message || 'Invalid token contract address' 
        };
    }
}

async function addToken() {
    const addressInput = document.getElementById("token_address");
    const symbolInput = "";
    const nameInput = "";
    
    // Show loading state
    const addTokenButton = document.getElementById("add_token");
    const originalButtonText = addTokenButton.innerHTML;
    addTokenButton.innerHTML = 'Validating...';
    addTokenButton.disabled = true;

    try {
        const address = addressInput.value.trim();

        if (!address) {
            throw new Error('Please enter a token contract address');
        }

        // Validate the token address and fetch details
        addTokenButton.innerHTML = 'Fetching token details...';
        const validation = await validateTokenAddress(address);
        if (!validation.isValid) {
            throw new Error(validation.error);
        }
        // console.log( "a1=",validation.symbol,await validateTokenAddress(address));

        // Auto-fill token details
        symbolInput.value = validation.symbol;
        nameInput.value = validation.name;

        // Get user's wallet address
        const walletData = JSON.parse(localStorage.getItem('userWallet'));
        if (!walletData?.address) {
            throw new Error('Wallet not found');
        }

        // Check if token already exists
        addTokenButton.innerHTML = 'Checking existing tokens...';
        const existingTokens = await fetch("http://localhost:3000/api/v1/tokens/alltoken");
        const tokenData = await existingTokens.json();
        
        const tokenExists = tokenData.data.tokens.some(token => 
            token.address.toLowerCase() === address.toLowerCase() &&
            token.provider.toLowerCase() === providerURL.toLowerCase() &&
            token.connected_account.toLowerCase() === walletData.address.toLowerCase()
        );

        if (tokenExists) {
            throw new Error('Token already imported');
        }

        // Prepare data for API call
        addTokenButton.innerHTML = 'Importing token...';
        const data = {
            name: validation.name,
            address: address,
            symbol: validation.symbol,
            provider: providerURL,
            connected_account: walletData.address,
            avatar: validation.avatar // Add avatar to the token data
        };

        // Make API call to add token
        const response = await fetch("http://localhost:3000/api/v1/tokens/createtoken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.status === 'success') {
            // Clear form
            addressInput.value = '';
            symbolInput.value = '';
            nameInput.value = '';

            // Show success message
            alert('Token imported successfully');

            // Refresh the assets list
            myFunction();

            // Go back to home screen
            importGoBack();
        } else {
            throw new Error(result.message || 'Failed to import token');
        }

    } catch (error) {
        // console.error('Error adding token:', error);
        alert(error.message || 'Failed to import token. Please try again.');
    } finally {
        // Reset button state
        addTokenButton.innerHTML = originalButtonText;
        addTokenButton.disabled = false;
    }
}

// Update the importGoBack function
function importGoBack() {
    // console.log('importGoBack called');
    const importToken = document.getElementById("import_token");
    const home = document.getElementById("home");
    const walletInfo = document.querySelector(".wallet_info");
    
    if (importToken && home) {
        // console.log('Hiding import token, showing home');
        importToken.style.display = "none";
        home.style.display = "block";
        if (walletInfo) walletInfo.style.display = "block";
        
        // // Clear form fields
        // document.getElementById("token_address").value = ' ';
        // document.getElementById("token_symbol").value = ' ';
        // document.getElementById("token_name").value = ' ';
    } else {
        console.error('Import token or home element not found');
    }
}

// Add event listener for the import token button
document.addEventListener('DOMContentLoaded', function() {
    const addTokenButton = document.getElementById('add_token');
    if (addTokenButton) {
        addTokenButton.addEventListener('click', addToken);
    }
});

// Add these utility functions
function generateTokenAvatar(symbol) {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    
    // Draw circle background
    ctx.beginPath();
    ctx.arc(20, 20, 20, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 30%)`; // Random color
    ctx.fill();
    
    // Draw text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol.slice(0, 1).toUpperCase(), 20, 20);
    
    return canvas.toDataURL();
}

// Add this function to initialize the active network on page load
function initializeActiveNetwork() {
    const activeNetwork = localStorage.getItem("ACTIVE_NETWORK");
    if (activeNetwork) {
        document.querySelectorAll('.network_item').forEach(item => {
            const span = item.querySelector('span');
            if (span && span.textContent.trim() === activeNetwork) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

// Add this function near the top of your file
function initializeNetwork() {
    // Get saved network URL from localStorage
    const savedNetworkUrl = localStorage.getItem("ACTIVE_NETWORK_URL");
    if (savedNetworkUrl) {
        providerURL = savedNetworkUrl;
        
        // Update network display name
        const networkName = getNetworkName(savedNetworkUrl);
        const networkElement = document.getElementById("selected_network");
        if (networkElement) {
            networkElement.textContent = networkName;
        }
        
        // Update active network item visual state
        document.querySelectorAll('.network_item').forEach(item => {
            const span = item.querySelector('span');
            if (span && span.textContent === networkName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

// Add this function to handle the MAX button click
async function handleMaxAmount() {
    try {
        const provider = new ethers.providers.JsonRpcProvider(providerURL);
        const selectedToken = document.querySelector('.selected_token');
        const amountInput = document.getElementById('amount');

        // Get current gas price
        const gasPrice = await provider.getGasPrice();
        const gasLimit = 21000; // Standard gas limit for ETH transfers
        const gasCost = gasPrice.mul(gasLimit);

        if (selectedToken.dataset.address === 'native') {
            // Handle native token (ETH, MATIC, BNB, etc.)
            const balance = await provider.getBalance(address);
            
            // Subtract gas cost from balance for native token
            const maxAmount = balance.sub(gasCost);
            
            // Convert to readable format and set input value
            if (maxAmount.gt(0)) {
                const formattedAmount = ethers.utils.formatEther(maxAmount);
                amountInput.value = parseFloat(formattedAmount).toFixed(6);
            } else {
                amountInput.value = '0';
            }
        } else {
            // Handle ERC20 tokens
            const tokenAddress = selectedToken.dataset.address;
            const ERC20_ABI = [
                "function balanceOf(address) view returns (uint256)",
                "function decimals() view returns (uint8)"
            ];
            
            const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
            const [balance, decimals] = await Promise.all([
                tokenContract.balanceOf(address),
                tokenContract.decimals()
            ]);
            
            const formattedAmount = ethers.utils.formatUnits(balance, decimals);
            amountInput.value = parseFloat(formattedAmount).toFixed(6);
        }
    } catch (error) {
        // console.error('Error setting max amount:', error);
        alert('Error setting maximum amount');
    }
}

// Add this function to handle going back to login screen
function goBackToLogin() {
    // Hide create account form
    document.getElementById("create_popUp").style.display = "none";
    
    // Show login screen
    document.getElementById("LoginUser").style.display = "block";
    
    // Hide wallet info if visible
    document.querySelector(".wallet_info").style.display = "none";
    
    // Clear form data
    document.getElementById("sign_up_email").value = '';
    document.getElementById("sign_up_password").value = '';
    
    // Reset form state
    document.getElementById("field").style.display = "block";
    document.getElementById("center").style.display = "none";
    document.getElementById("accountData").style.display = "none";
    document.getElementById("sign_up").style.display = "block";
}

