import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { SiZwave } from 'react-icons/si';
import { useWeb3 } from '../contexts/Web3Context';

function Wave() {
  const [show, setShow] = useState(false);
  const { getMyWaves } = useWeb3();
  const [allWaves, setAllWaves] = useState([]);

  const [cnt, setCnt] = useState(0);
  

  const checkWave = async () => {
    let x  = await getMyWaves();
    console.log("result is: %s", x.length);
    setCnt(x.length);
    console.log(x);
    setAllWaves(x);
    setShow(true);
    console.log("show");
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="position-float"
      style={{ minHeight: '0px' }}
    >
      <a href='#' onClick={checkWave}><SiZwave className='me-2' /></a>
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