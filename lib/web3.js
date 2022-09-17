import abi from "@/utils/WavePortal.json";
import HGT from "@/utils/HGToken.json";
import HMT from "@/utils/HMToken.json";

import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

const contractAddress = '0xe556656Fd571588365A258ec514c52620F13420b';//'0x671f8921295a4f582f9296245502508422FBEB92';//'0x1D162cc9d194204Bed89D95e8d7eB64Dfb6ca307';
const contractABI = abi.abi;

const HMTAddress = '0x44CB024F49d257ac3526F078DAC4272641b26cC4';
const HMTABI = HMT.abi;

const HGTAddress = '0x757f71E70A29fB9ef760B80852B62f382aC8b8e7';
const HGTABI = HGT.abi;

const providerOptions = {
  injected: {
    package: null,
    connector: async () => {
      return 'injected';
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    },
    connector: async () => {
      return 'walletconnect';
    },
  },
};



export function hasWeb3() {
  if (typeof window === 'undefined') {
    return false;
  }
  if (window.ethereum) {
    return true;
  } else {
    if (!window.web3) {
      return false;
    }
    // Checking if we're in a mobile browser, if not we can display just WalletConnect
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      return false;
    } else {
      return true;
    }
  }
}

export function getWalletAddress() {
  if (typeof window === 'undefined') {
    return null;
  }
  const connected = window.localStorage.getItem('wallet');
  if (connected !== null && connected.indexOf('0x') === 0) {
    return connected;
  }
  return null;
}

export function getENSName() {
  if (typeof window === 'undefined') {
    return null;
  }
  const name = window.localStorage.getItem('ensName');
  if (name !== null && name.length && name !== 'null') {
    return name;
  }
  return null;
}

export function initWeb3(provider) {
  return new Promise(async (response) => {
    console.log('Init new Web3 instance.');
    // Connecto to Web3
    const web3 = await new Web3(provider);
    // Return Web3 instance
    response(web3);
  });
}

export function initWeb3Modal() {
  return new Promise(async (response) => {
    console.log('Init new Web3Modal instance.');
    // Connecto to Web3
    const web3Modal = new Web3Modal({
      //network: 'mainnet',
      cacheProvider: false,
      providerOptions,
    });
    // Return Web3Modal instance
    response(web3Modal);
  });
}

/**
 * Launces the web3 modal and resolves to the connected wallet address or false if not successful
 *
 * @returns {false | string} Returns the connected wallet address or false if not connected
 */
export async function connectWallet() {
  // Connecto to Web3
  console.log('Init Web3Modal first.');
  const web3Modal = await initWeb3Modal();
  const provider = await web3Modal.connect();
  console.log('Now we have the provider connnecting to Web3.');
  const web3 = await initWeb3(provider);
  // Read network to be sure we're in Ethereum network (id: 1)
  let network = await web3.eth.net.getId();
  console.log('Web3 network is:', network);
  if (network !== 5) {
    alert('Please switch network to Ethereum Mainnet(Goerli)!' + network);
    return false;
  } else {
    try {
      // Request accounts
      await window.ethereum.send('eth_requestAccounts');
      // Read accounts
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];
      const name = await loadENSName(walletAddress);
      // Saving wallet to localstorage
      if (walletAddress) {
        localStorage.setItem('wallet', walletAddress);
      }
      if (name) {
        localStorage.setItem('ensName', name);
      }
      console.log('Connected account is:', walletAddress, name);
      return accounts[0];
    } catch (e) {
      console.log('Web3 errored:', e.message);
      return false;
    }
  }
}

export function disconnectWallet() {
  return new Promise(async (response) => {
    localStorage.removeItem('wallet');
    localStorage.removeItem('ensName');
    // if (web3 && web3.currentProvider && web3.currentProvider.close) {
    //   await web3.currentProvider.close();
    // }
    // await web3Modal.clearCachedProvider();
    console.log("disconnect successfully");

    


    response(true);
  });
}

export async function loadENSName(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const name = await provider.lookupAddress(address);
  console.log('loadENSName', name);
  if (name) {
    localStorage.setItem('ensName', name);
  }
  return name;
}

export async function executeContract(message, to) {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      let count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());

      const waveTxn = await wavePortalContract.wave(message, to);
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }

}

export async function getMyWaves() {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      /*
       * Call the getAllWaves method from your Smart Contract
       */
      const waves = await wavePortalContract.getAllWaves();
      let wavesCleaned = [];
      waves.forEach(wave => {
        console.log(wave.waver+wave.message);
        wavesCleaned.push({
          address: wave.waver.substr(0, 5) + ".." + wave.waver.substr(-3),
          timestamp: timeSince(new Date(wave.timestamp * 1000)),
          message: wave.message
        });
      });
      return wavesCleaned;

    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getMyAccount() {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      /*
       * Call the getAccountDetails method from your Smart Contract
       */
      const details = await wavePortalContract.getAccountDetails();
      return details;

    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getWhoPaid(id) {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      /*
       * Call the getwhopaid method from your Smart Contract
       */
      const whos = await wavePortalContract.getAllWhoPaid(id);
      let whosCleaned = [];
      whos.forEach(who => {
        console.log(who.tenant + who.amount);
        whosCleaned.push({
          address: who.tenant,
          timestamp: timeSince(new Date(who.timestamp * 1000)),
          amount: parseFloat(ethers.utils.formatEther(who.amount))
        });
      });
      return whosCleaned;

    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log(error);
  }
}


export async function paid(amount, id) {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

      const HMTContract = new ethers.Contract(HMTAddress, HMTABI, signer);
      const approveTxn = await HMTContract.approve(wavePortalContract.address,amount);
      console.log("wait for approve", approveTxn.hash);
      await approveTxn.wait();
      console.log("Mined -- ", approveTxn.hash);

      const paidTxn = await wavePortalContract.paid(amount, id);
      console.log("Mining...", paidTxn.hash);

      await paidTxn.wait();
      console.log("Mined -- ", paidTxn.hash);

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
}


export async function agree(amount, address, id) {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
 

      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      const paidTxn = await wavePortalContract.agree(amount, address, id);
      console.log("Mining...", paidTxn.hash);

      await paidTxn.wait();
      console.log("Mined -- ", paidTxn.hash);

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
}




export async function getContract(onNewWave, flag) {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      flag ? wavePortalContract.on("NewWave", onNewWave):wavePortalContract.off("NewWave", onNewWave);
      return wavePortalContract;
    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log(error);
  }
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return "Just now";
}
