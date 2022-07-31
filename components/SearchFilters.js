import { Container, Row, Col, Form, Group, Label } from 'react-bootstrap';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from './Layout';
import { filterData, getFilterValues } from '@/utils/filterData';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import styles from '@/styles/Search.module.css';

export default function SearchFilters() {
  const [filters, setFilters] = useState(filterData);

  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      // add only combined search params in the URL
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <Form className='bg-white p-4 shadow-sm pb-5'>
      <Row>
        {filters.map((filter) => (
          <Col sm={4} md={6} lg={4}>
            <Form.Group key={filter.queryName}>
              <Form.Label className='mt-2 mb-2 fw-bold'>
                {filter.placeholder}
              </Form.Label>

              <Form.Select
                onChange={(e) =>
                  // fetch all filter properties on d UI
                  searchProperties({ [filter.queryName]: e.target.value })
                }
              >
                {filter.items.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        ))}
      </Row>
    </Form>
  );
}
