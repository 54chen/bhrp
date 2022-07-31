import { ethers } from 'ethers';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
 

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
      infuraId: INFURA_ID,
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

export function getENSName(){
  if (typeof window === 'undefined') {
    return null;
  }
  const name = window.localStorage.getItem('ensName');
  if (name !== null && name.length && name !== 'null') {
    return name;
  }
  return null;
}

export function initWeb3(provider){
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
      network: 'mainnet',
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
  let web3Modal = await initWeb3Modal();
  const provider = await web3Modal.connect();
  console.log('Now we have the provider connnecting to Web3.');
  const web3 = await initWeb3(provider);
  // Read network to be sure we're in Ethereum network (id: 1)
  let network = await web3.eth.net.getId();
  console.log('Web3 network is:', network);
  if (network !== 1) {
    alert('Please switch network to Ethereum Mainnet!');
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
 