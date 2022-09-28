import Layout from '@/components/Layout';
import styles from '@/styles/SingleProperty.module.css';
import { getNameByCateID } from '@/utils/filterData';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import About from './about';
import AgentInfo from './agent';
import Features from './features';

const { PrismaClient } = require('@prisma/client')

export default function SingleProperty({
  property: { id, room, bath, type, price, desc, wallet, img, ens },
}) {
  const amenities = [room + " room", bath + " bath", getNameByCateID(type), price + "NZD/week"]
  return (
    <Layout title={`${room}Bedroom | BHRP`}>
      <section className={styles.singleProperty}>
        <Container fluid>{/* image: use carousel slider */}</Container>

        {/* */}

        <Container>
          <Row>
            <Col lg={7} className='mt-4'>
              <Row className='mx-auto bg-white shadow-sm mt-4'>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={img}
                      alt="First slide"
                    />
                  </Carousel.Item></Carousel>
              </Row>

              <About description={desc} />

              <Row className='mx-auto bg-white shadow-sm mt-4'>
                <h2 className='fs-5 fw-bold pt-4 pb-4 border-bottom px-4'>
                  Features of Property
                </h2>
                {amenities.map((item) =>
                  <Features key={item} amenity={item} />
                )}
              </Row>
            </Col>

            <Col lg={5} className='ps-lg-5'>
              <AgentInfo
                agency={ens}
                contactName={wallet}
                price={price}
                id={id}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const prisma = new PrismaClient();
  const propertyForRent = await prisma.house.findUnique({
    where: { id: parseInt(id) }
  });
  return {
    props: {
      property: propertyForRent,
    }
  };
}
