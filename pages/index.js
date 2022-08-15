import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import RecentProperty from '@/components/RecentProperty';
import Title from '@/components/Title';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import { Button, Container, Row } from 'react-bootstrap';

const { PrismaClient } = require('@prisma/client')


export default function HomePage({ propertyForRent }) {
  const router = useRouter();

  return (
    <Layout title='BHRP | Home'>
      <div className={styles.wrapper}>
        <Hero
          title='The first CRYPTO rental platform in NZ'
          info='Find Your Dream House Easily and Quickly.'
        />
        <Container className={styles.properties}>
          <Title
            title='Recent Properties'
            info='We have properties for rent anywhere in New Zealand'
          />
          <Row>
            {propertyForRent.map((property) => (
              <RecentProperty key={property.id} property={property} />
            ))}


          </Row>

          <div className='text-center mt-4 mb-4'>
            <Button
              onClick={() => router.push('/search?purpose=for-rent')}
              size='lg'
            >
              More Properties
            </Button>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const propertyForRent = await prisma.house.findMany({take:6, orderBy:{id:'desc'}});
  return {
    props: {
      propertyForRent: propertyForRent,
    },
    revalidate: 60,
  };
}
