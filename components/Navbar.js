import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BiHome } from 'react-icons/bi';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';
import { useWeb3 } from '../contexts/Web3Context';
import React, { useEffect, useState } from 'react';
import {
  Heading,
  Box,
  Flex,
  Image,
  ListItem,
  ListIcon,
  List,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  ButtonGroup,
  ButtonProps,
  DrawerFooter,
} from '@chakra-ui/react';

export default function Header() {
  return (
    <Navbar collapseOnSelect expand='md' className='shadow-sm bg-white'>
      <Container>
        <Link href='/'>
          <a className='me-4' className={styles.home}>
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
    loadBankBalance,
  } = useWeb3();
  const {
    isOpen: balanceModalIsOpen,
    onOpen: onBalanceModalOpen,
    onClose: onBalanceModalClose,
  } = useDisclosure();

  useEffect(() => {
    if (isConnected && (bankBalance == null)) {
      loadBankBalance();
    }
  });

  const compactFormatter = Intl.NumberFormat('en', { notation: 'compact' });

  function handleClick() {
    if (!hasWeb3) {
      alert(
        'Please use a Web3 compatible browser or extension, such as MetaMask',
      );
    }
    if (walletAddress) {
      onBalanceModalOpen();
    } else {
      connectWallet();
    }
  }

  let buttonText = () => {
    if (!walletAddress) {
      return 'Connect Wallet';
    }
    return (
      <Davatar size={24} address={walletAddress || ""} />
    )
  }

  return (
    <>
  
      <ButtonGroup size={props.size} isAttached onClick={handleClick}>
        {bankBalance !== null && (
          <Button bg="black" color="white">
            {compactFormatter.format(bankBalance)} BANK
          </Button>
        )}
        <Button title={ensName || (walletAddress ? (walletAddress.substr(0, 4) + ".." + walletAddress.substr(-3)) : null) || "Connect Wallet"}>{buttonText()}</Button>
      </ButtonGroup>
    </>
  );
}
