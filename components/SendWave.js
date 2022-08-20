import { useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaFacebookMessenger } from 'react-icons/fa';
import { useWeb3 } from '../contexts/Web3Context';


function SendWave({to}) {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');

  const ref = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMsg = (e) => setMsg(e.target.value);

  const wave = async () => {
    console.log('wave to the landlord!');
    executeContract(ref.current.value, to);
    alert('Send to blockchain successfully!');
    setShow(false);
  }
  
  const {walletAddress,ensName,connectWallet,executeContract} = useWeb3();
  const from = ensName || walletAddress || "Please Connect Your Wallet!";
  const handleAnonyClose = () => {setShow(false);connectWallet();};

  return (
    <>
      <a href='#' onClick={handleShow}><p className='fw-bold'><FaFacebookMessenger className='me-2' />
          Send a wave by Blockchain</p></a>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Say Hi to the landlord</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Your ETH address</Form.Label>
              <Form.Control
                type="input"
                readOnly
                placeholder={from}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Say something to the landlord, you will be rewarded ETH randomly!</Form.Label>
              <Form.Control ref={ref} onChange={handleMsg} placeholder={msg} as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={walletAddress? wave : handleAnonyClose}>
            Send a Wave
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SendWave;