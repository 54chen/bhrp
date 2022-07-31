import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { Web3Provider } from '../contexts/Web3Context';

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });

  return (

    <Web3Provider>      
      <Head>
       
      </Head>
        <Component {...pageProps} />
    </Web3Provider>

  );
}

export default MyApp;
