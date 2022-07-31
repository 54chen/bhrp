import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SearchFilters from '@/components/SearchFilters';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import Layout from '@/components/Layout';
import RecentProperty from '@/components/RecentProperty';
import styles from '@/styles/Search.module.css';

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
  const purpose = query.purpose || 'for-rent';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
