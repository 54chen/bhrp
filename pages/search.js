import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SearchFilters from '@/components/SearchFilters';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import Layout from '@/components/Layout';
import RecentProperty from '@/components/RecentProperty';
import styles from '@/styles/Search.module.css';
const { PrismaClient } = require('@prisma/client')

export default function SearchPage({ properties }) {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Layout>
      <section className={styles.search}>
        <Container>
          {/* fetch query in the url either: for-rent or for-sale */}
          <h2 className='fs-4 fw-bold'>Properties {router.query.purpose}</h2>
          <SearchFilters />

          <Row className='mt-5 pb-5'>
            {properties.map((property) => (
              <RecentProperty property={property} key={property.id} />
            ))}
          </Row>
          {/* if search result isn't found */}
          {properties.length === 0 && (
            <p className='text-center fs-2'>No result found</p>
          )}
        </Container>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {

  const prisma = new PrismaClient();

  const maxPrice = parseInt(query.maxPrice) || 100;
  const roomsMin = parseInt(query.roomsMin) || 1;
  const bathsMin = parseInt(query.bathsMin) || 1;
  const sort = query.sort || 'price-des';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = parseInt(query.categoryExternalID) || 4;

  var order = {}
  switch (sort) {
    case 'price-des':
      order = { price: 'desc' };
      break;
    case 'price-asc':
      order = { price: 'asc'};
      break;
    case 'date-asc':
      order = { id: 'desc' };
      break;
    case 'date-desc':
      order = { id: 'asc' };
      break;
    case 'verified-score':
      order = { wallet: 'desc'};
      break;
    default:
      order = { id: 'desc' };
      break;
  }


  const properties = await prisma.house.findMany({
    where: {
      price: { lte: maxPrice },
      room: { lte: roomsMin },
      bath: { lte: bathsMin },
      type: categoryExternalID
    },
    take: 6, orderBy: order
  })



  return { props: { properties } };
}
