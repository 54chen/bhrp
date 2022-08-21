import Layout from '@/components/Layout';
import RecentProperty from '@/components/RecentProperty';
import SearchFilters from '@/components/SearchFilters';
import styles from '@/styles/Search.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, Pagination, Row } from 'react-bootstrap';
const { PrismaClient } = require('@prisma/client')
const pageSize = 6;
export default function SearchPage({ properties, page, maxPage }) {
  const [searchFilters, setSearchFilters] = useState(false);

  const router = useRouter();

  const pagenation = (page) => {
    const path = router.pathname;
    const { query } = router;
    query['page'] = page;
    router.push({ pathname: path, query });
  };
  let items = [];
  for (let number = 1; number <= maxPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page} onClick={(e) =>
        // fetch all filter properties on d UI
        pagenation(number)
      }>
        {number}
      </Pagination.Item>,
    );
  }

  const paginationBasic = (<Pagination>{items}</Pagination>);

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
          <Row>{paginationBasic}</Row>
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

  const page = parseInt(query.page) || 1;

  var order = {}
  switch (sort) {
    case 'price-des':
      order = { price: 'desc' };
      break;
    case 'price-asc':
      order = { price: 'asc' };
      break;
    case 'date-asc':
      order = { id: 'desc' };
      break;
    case 'date-desc':
      order = { id: 'asc' };
      break;
    case 'verified-score':
      order = { wallet: 'desc' };
      break;
    default:
      order = { id: 'desc' };
      break;
  }

  const whereOption = {
    price: { lte: maxPrice },
    room: { lte: roomsMin },
    bath: { lte: bathsMin },
    type: categoryExternalID
  };
  const findOption = {
    where: whereOption,
    skip: (page-1) * pageSize, take: pageSize, orderBy: order
  };

  console.log(findOption);
  const properties = await prisma.house.findMany(findOption);

  const cnt = await prisma.house.count({where:whereOption});
  const maxPage = cnt/pageSize;

  return { props: { properties, page, maxPage } };
}
