import styles from '@/styles/Agent.module.css';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { FaBitcoin, FaFacebookMessenger } from 'react-icons/fa';
import { useWeb3 } from '../../contexts/Web3Context';

export default function AgentInfo({
  agency,
  contactName,
  verification,
  phoneNumber,
}) {

  const {
    hasWeb3,
    walletAddress,
    ensName,
    connectWallet,
    disconnectWallet,
    executeContract,
    isConnected
  } = useWeb3();

  const wave = async (to) => {
    console.log('wave to the landlord!');
    executeContract("this is a wave message", to);
  }


  return (
    <div className='bg-white p-4 mt-4 mt-lg-5 shadow-sm'>
      <h2 className='fs-5 fw-bold text-center mb-3'>
        Contact landlord: {(contactName.substr(0, 5) + ".." + contactName.substr(-3))}
      </h2>

      <div className={styles.agent}>
        <Image src={`/images/agent.png`} width={80} height={80} />
      </div>

      <div className='text-center'>
        {/*<h4 className='fs-5 text-se'>
          {agency}{' '}
          {verification ? (
            <GoVerified className='text-success' />
          ) : (
            <GoUnverified className='text-danger' />
          )}{' '}
          </h4>
          <p className='fw-bold'>Call: {phoneNumber}</p>
          */}
        <a href='#' onClick={()=>{wave(contactName)}}><p className='fw-bold'><FaFacebookMessenger className='me-2' />
          Send a wave by Blockchain</p></a>
        <div className='d-grid gap-2'>
          <Button variant='primary'>
            <FaBitcoin className='me-2' />
            Create Payments
          </Button>
        </div>
      </div>
    </div>
  );
}