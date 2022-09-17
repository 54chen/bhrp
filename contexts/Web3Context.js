import { createContext, useContext, useEffect, useState } from 'react';
import * as libWeb3 from '../lib/web3';

const Web3Context = createContext(undefined);

function getInitialState() {
  return {
    walletAddress: libWeb3.getWalletAddress(),
    ensName: libWeb3.getENSName(),
    hasWeb3: libWeb3.hasWeb3(),
  };
}

export function Web3Provider({ children }) {
  const [state, setState] = useState(getInitialState());

  // run this once when the app first loads to check if someone has an already connected a wallet in
  // local storage but hasn't yet loaded the ENS name because maybe it's newly registered.
  useEffect(() => {
    if (state.walletAddress && !state.ensName) {
      libWeb3.loadENSName(state.walletAddress).then((ensName) => {
        setState({ ...state, ensName });
      });
    }
  }, []);

  async function connectWallet() {
    if (state.hasWeb3) {
      let connectResult = await libWeb3.connectWallet();
      if (connectResult !== false && connectResult.indexOf('0x') === 0) {
        setState({
          ...state,
          walletAddress: connectResult,
          ensName: libWeb3.getENSName(),
        });
      }
    } else {
      throw new Error('Browser is not Web3 enabled');
    }
  }

  async function disconnectWallet() {
    console.log('disconnectWallet');
    await libWeb3.disconnectWallet();
    setState(getInitialState());
  }

  async function executeContract(message, to) {
    console.log('execute contract');
    await libWeb3.executeContract(message, to);
  }

  async function getMyWaves() {
    console.log('get my waves!');
    return await libWeb3.getMyWaves();
  }
  async function getContract(onNewWave, flag) {
    console.log('get my getContract!');
    return await libWeb3.getContract(onNewWave, flag);
  }

  async function getMyAccount() {
    console.log('get my getMyAccount!');
    return await libWeb3.getMyAccount();
  }
  async function getWhoPaid(id) {
    console.log('get my function getWhoPaid(id)!');
    return await libWeb3.getWhoPaid(id);
  }
  async function paid(amount, id) {
    console.log('get my async function paid!');
    return await libWeb3.paid(amount, id);
  }

  async function agree(amount, address, id) {
    console.log('get my async function agree(amount, address, id)!');
    return await libWeb3.agree(amount, address, id);
  }
  async function awardItem(address, id) {
    console.log('get my async function awardItem(address, id)!');
    return await libWeb3.awardItem(address, id);
  }

  const value = {
    connectWallet,
    disconnectWallet,
    executeContract,
    getMyWaves, getContract, getMyAccount, getWhoPaid, paid, agree,awardItem,
    isConnected: Boolean(state.walletAddress),
    ...state,
  };
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3Context must be used within a <Web3Provider>');
  }
  return context;
}
