import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import '@/styles/globals.css';
// import 'bootstrap/dist/css/bootstrap.css';

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
        <link href="https://getbootstrap.com/docs/5.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous" />
      </Head>
        <Component {...pageProps} />
    </Web3Provider>

  );
}

export default MyApp;
