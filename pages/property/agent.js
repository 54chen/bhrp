import Image from 'next/image';
import { FaBitcoin } from 'react-icons/fa';
import { GoVerified, GoUnverified } from 'react-icons/go';
import { Button } from 'react-bootstrap';
import styles from '@/styles/Agent.module.css';

export default function AgentInfo({
  agency,
  contactName,
  verification,
  phoneNumber,
}) {
  return (
    <div className='bg-white p-4 mt-4 mt-lg-5 shadow-sm'>
      <h2 className='fs-5 fw-bold text-center mb-3'>
        Contact landlord: {contactName}
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
          </h4>*/}
        <p className='fw-bold'>Call: {phoneNumber}</p>

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
