import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import '@/styles/globals.css';
//import 'bootstrap/dist/css/bootstrap.css';

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
      <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossorigin="anonymous"
/>
      </Head>
        <Component {...pageProps} />
    </Web3Provider>

  );
}

export default MyApp;
