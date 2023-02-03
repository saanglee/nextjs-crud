import { FunctionComponent } from 'react';
import { AuthProvider, useAuth } from 'store/authProvider';
import Layout from '../components/layout';

import '../styles/index.scss';
import { useRouter } from 'next/router';

interface AppProps {
  Component: FunctionComponent;
  pageProps: Record<string, unknown>;
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const user = useAuth();
  if (!user) router.replace('/login');
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
