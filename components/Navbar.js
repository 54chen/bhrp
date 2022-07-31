import { Navbar, Container, Nav, Button, ButtonGroup } from 'react-bootstrap';
import { BiHome } from 'react-icons/bi';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';
import { useWeb3 } from '../contexts/Web3Context';
import React, { useEffect, useState } from 'react';

export default function Header() {
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
          <Nav className='me-auto'></Nav>

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
  const {
    hasWeb3,
    walletAddress,
    ensName,
    connectWallet,
    disconnectWallet,
    isConnected,
    bankBalance,
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

  let buttonText = () => {
    if (!walletAddress) {
      return 'Connect Wallet';
    }
    return (
      <div>{ensName || (walletAddress ? (walletAddress.substr(0, 4) + ".." + walletAddress.substr(-3)) : null) || "Connect Wallet"}</div>
    )
  }

  return (
    <>
      <ButtonGroup size={props.size} onClick={handleClick}>
        <Button bg="black" color="white" title={ensName || (walletAddress ? (walletAddress.substr(0, 4) + ".." + walletAddress.substr(-3)) : null) || "Connect Wallet"}>{buttonText()}</Button>
      </ButtonGroup>
    </>
  );
}
