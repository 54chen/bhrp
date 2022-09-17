import { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { MdGeneratingTokens, MdOutlineAttachMoney, MdOutlineGeneratingTokens, MdOutlineMoney } from 'react-icons/md';
import { useWeb3 } from '../contexts/Web3Context';
import { ethers } from 'ethers';

export default function Wallet() {
  const DEFAULT_IMG = "/images/property.jpg";
  const [account, setAccount] = useState([]);
  const [display, setDisplay] = useState(false);


  const {
    getMyAccount, getWhoPaid, paid, agree
  } = useWeb3(); 
  async function show() {
    setDisplay(true);
    let x = await getMyAccount();
    let acc = [];
    x.forEach(v => {
      acc.push(parseFloat(ethers.utils.formatEther(v)));
    });
    setAccount(acc);
  }
  return (
    <Row>
      
    <Col>
    <div className='bg-white p-4 mt-4 mt-lg-5 shadow-sm'>
      {!display && (<Row><Button onClick={show}>Open My Wallet</Button></Row>)}
      {display && (<div>
      <Row>
      <h4><MdGeneratingTokens/>My House (NFT): {account[4]}</h4>
       
      </Row>
      <Row>
      <h4><MdGeneratingTokens/>My Rental (NFT): {account[5]}</h4>
       
      </Row>
      <Row>
      <h4><MdGeneratingTokens/>My Housing Governance Token (HGT): {account[1]}</h4>
      </Row>
      <Row>
         
      </Row>
      <Row>
        <h5><MdOutlineGeneratingTokens/>Staking HGT: </h5>
      </Row>
      <Row>
       
      </Row>
      <Row>
      <h4><MdGeneratingTokens/>My Housing Maintenance Token (HMT): {account[0]}</h4>
       
      </Row>
      <Row>
      <h5><MdOutlineGeneratingTokens/>Staking HMT: {account[2]}</h5>
       
      </Row>
      <Row>
        <h3><MdOutlineAttachMoney/>Earned HGT: {account[3]}</h3>
       
      </Row>
      <Row>
      <h3><MdOutlineMoney/>Earned HMT: </h3>
       
      </Row>
      </div>)}
      </div>
     </Col>

    <Col>
    <div className='bg-white p-4 mt-4 mt-lg-5 shadow-sm'>

      <Row>
        {<img src={DEFAULT_IMG} width={428} height={284} />}
      </Row>
      </div>

      </Col>
    </Row>

  );
}
