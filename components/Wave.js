import { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { SiZwave } from 'react-icons/si';
import { GiWallet } from 'react-icons/gi';
import Alert from 'react-bootstrap/Alert';
import { useWeb3 } from '../contexts/Web3Context';

function Wave() {
  const [show, setShow] = useState(false);
  const { getMyWaves, getContract } = useWeb3();
  const [allWaves, setAllWaves] = useState([]);

  const [alertNew, setAlertNew] = useState('');


  const checkWave = async () => {
    let x = await getMyWaves();
    console.log("result is: %s", x.length);
    console.log(x);
    setAllWaves(x);
    setShow(true);
    setAlertNew('');
    console.log("show");
  }

  useEffect(() => {
    let wavePortalContract;

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setAlertNew('!');
      setAllWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };
    wavePortalContract = getContract(onNewWave, true);
    return () => {
      if (wavePortalContract) {
        getContract(onNewWave, false)
      }
    };
  }, []);


  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="position-float"
      style={{ minHeight: '0px' }}
    >      
      <a href='/wallet'><GiWallet className='me-2' /></a>

      <a href='#' onClick={checkWave}>{alertNew}<SiZwave className='me-2' /></a>
      <ToastContainer position="top-end" className="p-3">
        {allWaves.map((wave, index) => (
          <Toast key={index} onClose={() => setShow(false)} show={show} delay={5000} autohide>
            <Toast.Header>
              <strong className="me-auto">{wave.address}</strong>
              <small className="text-muted">{wave.timestamp.toString()}</small>
            </Toast.Header>
            <Toast.Body>{wave.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
}

export default Wave;