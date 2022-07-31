import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ title, description, keywords, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: 'Real Estate Properties in the UAE',
  description: 'Find, Buy & rent houses in the UAE',
  keywords: 'real estate, dubai, rent houses, buy houses',
};
