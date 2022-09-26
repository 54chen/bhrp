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
  const [load, setLoad] = useState(false);
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
    setLoad(true);
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
    setLoad(false);
  }

  async function disconnectWallet() {
    setLoad(true);
    console.log('disconnectWallet');
    await libWeb3.disconnectWallet();
    setState(getInitialState());
    setLoad(false);
  }

  async function executeContract(message, to) {
    setLoad(true);
    console.log('execute contract');
    let re = libWeb3.executeContract(message, to);
    setLoad(false);
    return re;
  }

  async function getMyWaves() {
    setLoad(true);
    console.log('get my waves!');
    let re = await libWeb3.getMyWaves();
    setLoad(false);
    return re;
  }
  async function getContract(onNewWave, flag) {
    setLoad(true);
    console.log('get my getContract!');
    let re = await libWeb3.getContract(onNewWave, flag);
    setLoad(false);
    return re;
  }

  async function getMyAccount() {
    setLoad(true);
    console.log('get my getMyAccount!');
    let re = await libWeb3.getMyAccount();
    setLoad(false);
    return re;
  }
  async function getWhoPaid(id) {
    setLoad(true);
    console.log('get my function getWhoPaid(id)!');
    let re = await libWeb3.getWhoPaid(id);
    setLoad(false);
    return re;
  }
  async function paid(amount, id) {
    setLoad(true);
    console.log('get my async function paid!');
    let re = await libWeb3.paid(amount, id);
    setLoad(false);
    return re;
  }

  async function withdraw(amount, id) {
    setLoad(true);
    console.log('get my async function withdraw!');
    let re = await libWeb3.withdraw(amount, id);
    setLoad(false);
    return re;
  }

  async function agree(amount, address, id) {
    setLoad(true);
    console.log('get my async function agree(amount, address, id)!');
    let re =  await libWeb3.agree(amount, address, id);
    setLoad(false);
    return re;
  }
  async function awardItem(address, id) {
    setLoad(true);
    console.log('get my async function awardItem(address, id)!');
    let re = await libWeb3.awardItem(address, id);
    setLoad(false);
    return re;
  }

  const value = {
    connectWallet,
    disconnectWallet,
    executeContract,
    getMyWaves, getContract, getMyAccount, getWhoPaid, paid, agree,awardItem,load,withdraw,
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
