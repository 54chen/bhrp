import { Container, Row, Col, Form, Group, Label, Button } from 'react-bootstrap';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import Layout from './Layout';
import { filterData, getFilterValues } from '@/utils/filterData';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import styles from '@/styles/Search.module.css';
import { useWeb3 } from '../contexts/Web3Context';
import { FaFileImage,FaFileUpload } from 'react-icons/fa';
import axios from "axios";



export default function Landlord() {
  const BUCKET_URL = "https://awss3stack-bhrpbucket4d926001-1fpwkenr8hw8b.s3.ap-southeast-2.amazonaws.com/";
  const DEFAULT_IMG = "/images/property.jpg";

  const [file, setFile] = useState()
  const [uploadingStatus, setUploadingStatus] = useState()
  const [uploadedFile, setUploadedFile] = useState(DEFAULT_IMG)

  const [validated, setValidated] = useState(false);
  const {
    hasWeb3,
    walletAddress,
    ensName,
    connectWallet,
    disconnectWallet,
    isConnected,
    bankBalance,
  } = useWeb3(); 
  const hiddenFileInput = React.useRef(null);


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  function handleWeb3Click() {
    if (!hasWeb3) {
      alert(
        'Please use a Web3 compatible browser or extension, such as MetaMask',
      );
    }
    if (walletAddress) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  }

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/s3/uploadFile", {
      name: file.name,
      type: file.type,
    });

    console.log(data);

    const url = data.url;
    let { data: newData } = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    setUploadedFile(BUCKET_URL + file.name);
    setFile(null);
  };
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    
    <Row>
    <Col xs={12} md={8}>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className='bg-white p-4 shadow-sm pb-5'>
              {filterData.map((filter) => (
                (filter.queryName != "sort" && filter.queryName != "maxPrice") &&
      <Row key={filter.queryName+"_row"}>
          <Col>
            <Form.Group key={filter.queryName}>
              <Form.Label className='mt-2 mb-2 fw-bold'>
                {filter.placeholder}
              </Form.Label>

              <Form.Select>
                {filter.items.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
      </Row>
              ))}

      <Row>
        <Col>
          <Form.Group key="price">
            <Form.Label htmlFor="price-input">
              Price
            </Form.Label>
            <Form.Control required type='input' id='price-input' aria-describedby='price-help'></Form.Control>
            <Form.Text id="price-help" muted>Please give a reasonable price for a crypto tenant.</Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group key="description">
            <Form.Label htmlFor="desc-input">
            Description
            </Form.Label>
            <Form.Control required as="textarea" rows={3} id='desc-input' aria-describedby='desc-help'></Form.Control>
            <Form.Text id="desc-help" muted>Please write down some description about your house and you.</Form.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
      <Form.Group key="wallet">
            <Form.Label htmlFor="wallet-input">
            Crypto Wallet Address  
            </Form.Label>
            <Form.Control  onClick={handleWeb3Click} readOnly required type='input' value={ensName || walletAddress || ""} id='wallet-input' aria-describedby='wallet-help'></Form.Control>
            <Form.Text id="wallet-help" muted>{!walletAddress ? 'Please Login with your WEB3 wallet in advance.':'GM, frens!'}</Form.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

      </Row>
      <Row>
      <Form.Group key="image">
            <Form.Label htmlFor="image-input">
            Image of your house  
            </Form.Label>
            <Form.Control readOnly required type='input' id='image-input' aria-describedby='image-help' value={uploadedFile}></Form.Control>
            <Form.Text id="image-help" muted>{DEFAULT_IMG==uploadedFile ? 'Please upload your image of house at first':uploadedFile}</Form.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

      </Row>
      <Row>
      <Button type="submit">Submit form</Button>
      </Row>
    </Form>
    </Col>

    <Col>
    <div className='bg-white p-4 mt-4 mt-lg-5 shadow-sm'>

    <Row>
    <Button onClick={handleClick}><FaFileImage className='me-2' />Select a image of your house</Button>
      <input ref={hiddenFileInput} style={{display: 'none'}} type="file" onChange={(e) => selectFile(e)} />

        {file && <><p>Image: {file.name} </p><Button onClick={uploadFile}><FaFileUpload className='me-2' />upload!</Button></>
}
        {uploadingStatus && <p>{uploadingStatus}</p>}
    </Row><p></p><Row>
        {<img src={uploadedFile} width={428} height={284} />}
        
      </Row>
      </div>

      </Col>
    </Row>

  );
}
