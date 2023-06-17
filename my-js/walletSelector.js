"use strict";
const presaleContractHash = "0x46E71304406c607e28c310AceF02f9FfEEB664Fe#code"
let bnbOwed = 0;
const tokensPerBnb = 38000;
var isWhitelisted = true;
var tokensUnclaimed = 0;
var startTime;
var publicSaleTime;
var isClaimEnabled = false;
const abi = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokens",
        "type": "uint256"
    }],
    "name": "TokenBuy",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokens",
        "type": "uint256"
    }],
    "name": "TokenClaim",
    "type": "event"
}, {
    "inputs": [{
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
    }],
    "name": "addWhitelisters",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "beneficiary",
        "type": "address"
    }],
    "name": "buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "claimEnabled",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "claimTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "getLastTokensClaimed",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getSafeTokensLeft",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getTokensOwned",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getTokensUnclaimed",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "lastTokensClaimed",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "onlyWhitelister",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bool",
        "name": "_enabled",
        "type": "bool"
    }],
    "name": "setClaimEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bool",
        "name": "_isSaleActive",
        "type": "bool"
    }],
    "name": "setSaleActive",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "contract IERC20",
        "name": "safeEarnToken",
        "type": "address"
    }],
    "name": "setToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "timestampStarted",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "tokensOwned",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "tokensPerBNB",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "tokensUnclaimed",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalTokensSold",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "whitelisted",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "whitelisterHardcap",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "withdrawMarketingFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "withdrawUnsoldTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "stateMutability": "payable",
    "type": "receive"
}]

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

// Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;

let accounts = []


/**
 * Setup the orchestra
 */
function init() {
    console.log("Initializing example");
    console.log("WalletConnectProvider is", WalletConnectProvider);
    console.log("Fortmatic is", Fortmatic);
    console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

    // Check that the web page is run in a secure context,
    // as otherwise MetaMask won't be available
    // if(location.protocol !== 'https:') {
    //     // https://ethereum.stackexchange.com/a/62217/620
    //     const alert = document.querySelector("#alert-error-https");
    //     alert.style.display = "block";
    //     document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    //     return;
    // }

    // Tell Web3modal what providers we have available.
    // Built-in web browser provider (only one can exist as a time)
    // like MetaMask, Brave or Opera is added automatically by Web3modal
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                // Mikko's test key - don't copy as your mileage may vary
                infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
            }
        },

        fortmatic: {
            package: Fortmatic,
            options: {
                // Mikko's TESTNET api key
                key: "pk_test_A671B4E7E0E254F1"
            }
        }
    };

    web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });

    console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

    // Get a Web3 instance for the wallet
    const web3 = new Web3(provider);

    console.log("Web3 instance is", web3);

    // Get connected chain id from Ethereum node
    const chainId = await web3.eth.getChainId();
    // Load chain information over an HTTP API
    const chainData = evmChains.getChain(chainId);

    // Get list of accounts of the connected wallet
    const accounts = await web3.eth.getAccounts();

    // MetaMask does not give you all accounts, only the selected account
    console.log("Got accounts", accounts);
    selectedAccount = accounts[0];
    // selectedAccount = "0x0456eDeec2C90703fFCe7b2C01CeC312dc4403E4";

    // Go through all accounts and get their ETH balance
    const rowResolvers = accounts.map(async (address) => {
        const balance = await web3.eth.getBalance(address);
        // ethBalance is a BigNumber instance
        // https://github.com/indutny/bn.js/
        const ethBalance = web3.utils.fromWei(balance, "ether");
        const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
    });

    // Because rendering account does its own RPC commucation
    // with Ethereum node, we do not want to display any results
    // until data for all accounts is loaded
    await Promise.all(rowResolvers);
}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

    // If any current data is displayed when
    // the user is switching acounts in the wallet
    // immediate hide this data
    // document.querySelector("#connected").style.display = "none";
    // document.querySelector("#prepare").style.display = "block";

    // Disable button while UI is loading.
    // fetchAccountData() will take a while as it communicates
    // with Ethereum node via JSON-RPC and loads chain data
    // over an API call.
    // document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    // await fetchAccountData(provider);
    // document.querySelector("#btn-connect").removeAttribute("disabled")
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();
        await fetchAccountData();
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return 1;
    }

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
        fetchAccountData();
    });

    // Subscribe to networkId change
    provider.on("networkChanged", (networkId) => {
        fetchAccountData();
    });

    await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

    console.log("Killing the wallet connection", provider);

    // TODO: Which providers have close method?
    if (provider.close) {
        await provider.close();

        // If the cached provider is not cleared,
        // WalletConnect will default to the existing session
        // and does not allow to re-scan the QR code with a new wallet.
        // Depending on your use case you may want or want not his behavir.
        await web3Modal.clearCachedProvider();
        provider = null;
    }

    selectedAccount = null;

    // Set the UI back to the initial state
    document.querySelector("#prepare").style.display = "block";
    document.querySelector("#connected").style.display = "none";
}

/**
 * Main entry point.
 */
let web3;

window.addEventListener('load', async () => {
    hideModal();
    $("#bnbInput").change(function() {
        const amt = parseFloat($("#bnbInput").val());
        if (amt < 0.1 || amt > 3) {
            $("#bnbInput").val(0)
        }
    });
    $("#claim-tokens").on("click", claimPresale)
    // $(".btn-submit-presale").on("click", buyPresale)
    $('#claim-tokens').attr("disabled", true);

    $(".btn-submit-presale").on("click", () => {
        if (web3 == null) {
            init();
            onConnect().then(x => {
                web3 = new Web3(provider)
                checkClaimEnabled().then(res => {
                    if (isClaimEnabled) {
                        $('#claim-tokens').attr("disabled", false);
                    } else {
                        $('#claim-tokens').attr("disabled", true);
                    }
                });
                getStartTime().then(timeRes => {
                    checkIfWhitelisted().then(response => {
                        if (x != -1) {
                            if (bnbOwed >= 2) {
                                $(".btn-submit-presale").html('Contributed Max!');
                            }

                            setTimeout(function() {
                                if (bnbOwed >= 2) {
                                    hideModal();
                                    $(".btn-submit-presale").html('Contributed Max!');
                                }
                            }, 1000)

                        } else {
                            console.log(x);
                            $(".btn-submit-presale").text("ERROR CONNECTING WALLET");
                        }
                        bnbCollected().then(x => {

                        });
                        contributionChecker().then(x => {
                            if (isClaimEnabled && tokensUnclaimed > 0) {
                                $('#claim-tokens').attr("disabled", false);
                            } else {
                                $('#claim-tokens').attr("disabled", true);
                            }

                        })
                    });
                })

            });
        } else {
            if (isWhitelisted) {
                // showModal();
                buyPresale();
            }
        }
    });

    $(".connect-wallet-only").on("click", () => {
        init();
        onConnect().then(x => {
            web3 = new Web3(provider)
            if (x != -1) {
                $(".connect-wallet-only").hide();
            }

            // // console.log(x)
            bnbCollected().then(x => {

            });
            //
            //
            contributionChecker().then(x => {
                if (isClaimEnabled && tokensUnclaimed > 0) {
                    $('#claim-tokens').attr("disabled", false);
                } else {
                    $('#claim-tokens').attr("disabled", true);
                }
            })

        });
    });





    // document.querySelector("#btn-connect").addEventListener("click", onConnect);
    // document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
});

function showModal() {
    // $('#presaleModal').modal('show');
}

function hideModal() {
    $('#presaleModal').modal('hide');
    $(".thx-for-presale").hide();
}


const createContract = (abi, contractHash) => new web3.eth.Contract(abi, contractHash);

// const checkMetaAndShowModal = async () => {
//     const metaConnect = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     accounts = metaConnect;
//     showModal(); // open modal
// }


const bnbCollected = async () => {
    var last_balance = 0;
    var diff = 0;
    const hardcap = 800;
    var a = 0;
    setInterval(async () => {
        const presaleContract = await createContract(abi, presaleContractHash);
        const totalTokensSold = await presaleContract.methods.totalTokensSold().call();
        const tokensSold = totalTokensSold / (10 ** 9);
        const bnbSold = tokensSold / tokensPerBnb;
        const percentage = bnbSold * 100 / hardcap;
        $("#bnb-raised").text(percentage.toFixed(2) + "% (" + bnbSold.toFixed(2) + ")");

        $('#progress-bar-presale').attr("aria-valuenow", percentage);
    }, 1000);
}

const getStartTime = async () => {
    const presaleContract = await createContract(abi, presaleContractHash);
    const timeStamp = await presaleContract.methods.timestampStarted().call();
    startTime = new Date(timeStamp * 1000);
    publicSaleTime = new Date(timeStamp * 1000);
    publicSaleTime = publicSaleTime.setMinutes(publicSaleTime.getMinutes() + 17);
}

const contributionChecker = async () => {
    const presaleContract = await createContract(abi, presaleContractHash);
    setInterval(async () => {
        const owedDiujInt = await presaleContract.methods.tokensUnclaimed(selectedAccount).call();
        tokensUnclaimed = owedDiujInt / (10 ** 9);
        $("#tokens-reserved").html(tokensUnclaimed.toFixed(0) + "<b> GETH</b>");
        $("#bnb-contrib").text((tokensUnclaimed / tokensPerBnb).toFixed(2));
    }, 1000);
}

const claimPresale = async () => {
    const presaleContract = await createContract(abi, presaleContractHash);
    await presaleContract.methods.claimTokens().send({
        from: selectedAccount
    });
}

const checkClaimEnabled = async () => {
    const presaleContract = await createContract(abi, presaleContractHash);
    isClaimEnabled = await presaleContract.methods.claimEnabled().call();
}

const checkIfWhitelisted = async () => {
    const presaleContract = await createContract(abi, presaleContractHash);
    isWhitelisted = await presaleContract.methods.whitelisted(selectedAccount).call();
    console.log(startTime);
    console.log(new Date(publicSaleTime));
    if (startTime > new Date()) {
        $('.btn-submit-presale').attr('disabled', true);
        $(".btn-submit-presale").text("Not Started");
    } else if (!isWhitelisted) {

        if (publicSaleTime > new Date().getTime()) {
            $(".btn-submit-presale").css("background-image", "linear-gradient(80deg, #e70707 0 %, #cd0505 100 %);");
            $('.btn-submit-presale').attr('disabled', true);
            $(".btn-submit-presale").text("You Are Not Whitelisted");
            if (startTime <= new Date()) {
                setTimeout(() => {
                    $('.btn-submit-presale').removeAttr("disabled");
                    $(".btn-submit-presale").text("Enter the Presale");
                    isWhitelisted = true;
                }, Math.abs(new Date() - publicSaleTime));
            }
        } else {
            $('.btn-submit-presale').removeAttr("disabled");
            $(".btn-submit-presale").text("Enter the Presale");
            isWhitelisted = true;
        }
    } else {
        $('.btn-submit-presale').removeAttr("disabled");
        $(".btn-submit-presale").text("Enter the Presale");
        isWhitelisted = true;
    }
}

const buyPresale = async () => {
    if (!isWhitelisted) {
        return;
    }
    const presaleContract = await createContract(abi, presaleContractHash);
    presaleContract.methods.buy(selectedAccount).send({
            from: selectedAccount,
            value: parseFloat($('#bnbInput').val()) * (10 ** 18)
        })
        .on('error', function(error) {
            // Error 
        })
        .then(function(transactionHash) {
            console.log(transactionHash + " success");
            $(".thx-for-presale").fadeIn();
            setTimeout(function() {
                hideModal();
                $(".thx-for-presale").hide();
            }, 2000);
        });

}