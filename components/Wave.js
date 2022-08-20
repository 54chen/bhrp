import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { SiZwave } from 'react-icons/si';
import { useWeb3 } from '../contexts/Web3Context';

function Wave() {
  const [show, setShow] = useState(false);
  const { getMyWaves } = useWeb3();
  const [allWaves, setAllWaves] = useState([]);


  const clickNoti = async () => {
    let x  = await getMyWaves();
    console.log("result is: %s", x.length);
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
      <a href='#' onClick={clickNoti}><SiZwave className='me-2' /></a>
      <ToastContainer position="top-end" className="p-3">
        {allWaves.map((wave, index) => {
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
              <img className="rounded me-2" alt="" />
              <strong className="me-auto">Address: {wave.address}</strong>
              <small className="text-muted">Time: {wave.timestamp.toString()}</small>
            </Toast.Header>
            <Toast.Body>Message: {wave.message}</Toast.Body>
          </Toast>
        })}
      </ToastContainer>
    </div>
  );
}

export default Wave;