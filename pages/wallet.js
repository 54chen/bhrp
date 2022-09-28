import Layout from '@/components/Layout';
import Wallet from '@/components/Wallet';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
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


