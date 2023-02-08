import { FunctionComponent } from 'react';
import { GetServerSidePropsContext } from 'next';
import { AuthProvider, useAuth } from 'context/authProvider';
import Layout from '../components/layout';

import '../styles/index.scss';
import { useRouter } from 'next/router';
import Head from 'next/head';
import nookies from 'nookies';

interface AppProps {
  Component: FunctionComponent;
  pageProps: Record<string, unknown>;
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const user = useAuth();
  const pathName = router.asPath.replace('/', '');

  return (
    <>
      <Head>
        <meta name="referrer" content="unsafe-url" />
        <meta name="description" content="CRUD project with react, next.js, & firebase" />
        <meta property="og:imgae" content="../assets/images/thumbnail.png" />
        <meta property="og:site_name" content="React CRUD" />
        <meta property="og:description" content="CRUD project with react & next.js" />
        <title> {pathName && `${pathName} • `}ReactCRUD</title>
      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);
  if (!cookies.token) {
    console.log('토큰 없음');
    context.res.setHeader('location', '/login');
    context.res.statusCode = 302;
    context.res.end();
  }
};

export default MyApp;
