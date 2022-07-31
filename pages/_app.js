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
    <>      
    <Web3Provider>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
          integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </Head>
      <Component {...pageProps} />
    </Web3Provider>
    </>
  );
}

export default MyApp;
