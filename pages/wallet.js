import { Container, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import styles from '@/styles/Home.module.css';
import Wallet from '@/components/Wallet';
export default function WalletPage() {
  const router = useRouter();

  return (
    <Layout title='BHRP | My wallet'>
      <div className={styles.wrapper}>
         
        <Container className={styles.properties}>
            <Wallet />
        </Container>
      </div>
    </Layout>
  );
}


