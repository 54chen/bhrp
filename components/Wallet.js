import { Col, Row } from 'react-bootstrap';
import { MdGeneratingTokens, MdOutlineAttachMoney, MdOutlineGeneratingTokens, MdOutlineMoney } from 'react-icons/md';
import { useWeb3 } from '../contexts/Web3Context';

export default function Wallet() {
  const DEFAULT_IMG = "/images/property.jpg";
  const {
    hasWeb3,
    walletAddress,
    ensName,
    connectWallet,
    disconnectWallet,
    isConnected,
    bankBalance,
  } = useWeb3(); 
  return (
    <Row>
      
    <Col>
    <div className='bg-white p-4 mt-4 mt-lg-5 shadow-sm'>

      <Row>
      <h4><MdGeneratingTokens/>My Housing Governance Token (HGT): 100</h4>
      </Row>
      <Row>
         
      </Row>
      <Row>
        <h5><MdOutlineGeneratingTokens/>Staking HGT: 10</h5>
      </Row>
      <Row>
       
      </Row>
      <Row>
      <h4><MdGeneratingTokens/>My Housing Maintenance Token (HGT): 100</h4>
       
      </Row>
      <Row>
      <h5><MdOutlineGeneratingTokens/>Staking HGT: 100</h5>
       
      </Row>
      <Row>
        <h3><MdOutlineAttachMoney/>Earned HGT: 100</h3>
       
      </Row>
      <Row>
      <h3><MdOutlineMoney/>Earned HMT: 100</h3>
       
      </Row>
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
