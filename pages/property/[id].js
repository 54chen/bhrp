import { Container, Row, Col } from 'react-bootstrap';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import Layout from '@/components/Layout';
import Image from 'next/image';
import About from './about';
import Features from './features';
import AgentInfo from './agent';
import styles from '@/styles/SingleProperty.module.css';

export default function SingleProperty({
  property: {
    price,
    rooms,
    description,
    amenities,
    agency,
    contactName,
    verification,
    phoneNumber,
  },
}) {
  return (
    <Layout title={`${rooms}Bedroom | Real Estate`}>
      <section className={styles.singleProperty}>
        <Container fluid>{/* image: use carousel slider */}</Container>

        {/* <Image
          src={image_150_113_url}
          width={400}
          height={260}
          objectFit='cover'
        /> */}

        <Container>
          <Row>
            <Col lg={7} className='mt-4'>
              <About description={description} />

              <Row className='mx-auto bg-white shadow-sm mt-4'>
                <h2 className='fs-5 fw-bold pt-4 pb-4 border-bottom px-4'>
                  Features of Property
                </h2>
                {amenities.map((item) =>
                  item.amenities.map((amenity) => (
                    <Features key={amenity.text} amenity={amenity.text} />
                  ))
                )}
              </Row>
            </Col>

            <Col lg={5} className='ps-lg-5'>
              <AgentInfo
                agency={agency.name}
                contactName={contactName}
                verification={verification}
                phoneNumber={phoneNumber.mobile}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      property: data,
    },
  };
}
