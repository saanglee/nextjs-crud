import { FunctionComponent } from 'react';
import { AuthProvider } from 'store/authProvider';
import Layout from '../components/layout';

import '../styles/index.scss';

interface AppProps {
  Component: FunctionComponent;
  pageProps: Record<string, unknown>;
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
