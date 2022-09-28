import Landlord from '@/components/Landlord';
import Layout from '@/components/Layout';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';

export default function LandlordPage() {
  const router = useRouter();

  return (
    <Layout title='BHRP | Submit my house'>
      <div className={styles.wrapper}>

        <Container className={styles.properties}>
          <Landlord />
        </Container>
      </div>
    </Layout>
  );
}


