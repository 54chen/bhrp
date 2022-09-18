import styles from '@/styles/Agent.module.css';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { FaBitcoin } from 'react-icons/fa';
import {IoIosPeople} from 'react-icons/io';
import {MdEmojiPeople} from 'react-icons/md';
import {AiOutlineCarryOut} from 'react-icons/ai';
import SendWave from '@/components/SendWave';
import { useWeb3 } from '../../contexts/Web3Context';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function AgentInfo({
  agency,
  contactName,
  price,
  id,
}) {
  const [whos, setWhos] = useState([]);

  const {
    getMyAccount, getWhoPaid, paid, agree
  } = useWeb3(); 

  async function pay() {
    //price = price * 0.0001;
    let x = await paid(price, id); 
  }

  async function show() {
    let x = await getWhoPaid(id); 
    setWhos(x);
  }

  async function onAgree(amount, address) {
    let x = await agree(amount, address, id); 
    setWhos(x);
  }

  const colors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ];
  return (
    <>
    <div className='bg-white p-4 mt-4 mt-lg-5 shadow-sm'>
      <h2 className='fs-5 fw-bold text-center mb-3'>
        Contact landlord: {agency || (contactName ? (contactName.substr(0, 4) + ".." + contactName.substr(-3)) : null)}
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
        <SendWave to={contactName} />
        <div className='d-grid gap-2'>
          <Button onClick={pay} variant='primary'>
            <FaBitcoin className='me-2' />
            Create Payments
          </Button>
        </div>
      </div>
    </div>
    <div className='bg-white p-4 mt-4 mt-lg-5 shadow-sm'>
        <div className='d-grid gap-2'>
          <Button onClick={show} variant='primary'>
            <IoIosPeople className='me-2' />
            Show Waiting List
          </Button>
          {whos && whos.map((who, index)=>(
            <Alert key={index} variant={colors[index%8]}>
              <MdEmojiPeople title={who.address} className='me-2' /> paid {who.amount} at {who.timestamp} <a href='#' onClick={()=>onAgree(who.amount, who.address)}><AiOutlineCarryOut title="Agree"/></a>
            </Alert>
          
          ))}
        </div>
    </div>
    </>
  );
}