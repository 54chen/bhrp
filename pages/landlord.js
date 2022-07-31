import { Container, Row, Col, Button } from 'react-bootstrap';
import { baseUrl, fetchApi } from '@/utils/fetchApi';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Property from '@/components/Property';
import Hero from '@/components/Hero';
import RecentProperty from '@/components/RecentProperty';
import Title from '@/components/Title';
import styles from '@/styles/Home.module.css';

export default function LandlordPage() {
  const router = useRouter();

  return (
    <Layout title='BHRP | Home'>
      <div className={styles.wrapper}>
         
        <Container className={styles.properties}>
           TBD
        </Container>
      </div>
    </Layout>
  );
}


