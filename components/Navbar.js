import styles from '@/styles/Navbar.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Nav, Navbar } from 'react-bootstrap';
import { BiHome } from 'react-icons/bi';
import { Dna } from 'react-loader-spinner';
import { useWeb3 } from '../contexts/Web3Context';
import Wave from './Wave';

export default function Header() {
  const {
    load
  } = useWeb3();
  return (
    <Navbar collapseOnSelect expand='md' className='shadow-sm bg-white'>
      <Container>
        <Link href='/'>
          <a className={styles.home}>
            <BiHome />
            {'  '}
            BHRP - Blockchain Housing Rental Platform
          </a>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'><Dna
            visible={load}
            height="50"
            width="50"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          /></Nav>

          <Nav className='fw-bold'>
            <Link href='/'>
              <a className='me-4'>Home</a>
            </Link>

            <Link href='/search'>
              <a className='me-4'>Search</a>
            </Link>

            <Link href='/landlord'>
              <a className='me-4'>I am the landlord</a>
            </Link>


            <ConnectionButton size="sm" />

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function ConnectionButton(props) {
  const [msg, setMsg] = useState('Login');
  const [wave, setWave] = useState(false);

  useEffect(() => {
    if (!walletAddress) {
      setMsg('Connect Wallet');
      setWave(false);
    } else {
      setWave(true);
    }
    const m = ensName || (walletAddress ? (walletAddress.substr(0, 4) + ".." + walletAddress.substr(-3)) : null) || "Connect Wallet";
    setMsg(m)
      , []
  });

  const {
    hasWeb3,
    walletAddress,
    ensName,
    connectWallet,
    disconnectWallet,
    isConnected,
    bankBalance,
    load
  } = useWeb3();

  const compactFormatter = Intl.NumberFormat('en', { notation: 'compact' });

  function handleClick() {
    if (!hasWeb3) {
      alert(
        'Please use a Web3 compatible browser or extension, such as MetaMask',
      );
    }
    if (walletAddress) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  }

  return (
    <>
      {wave && <Wave />}
      <ButtonGroup size={props.size} onClick={handleClick}>
        <Button bg="black" color="white">{msg}</Button>
      </ButtonGroup>
    </>
  );
}