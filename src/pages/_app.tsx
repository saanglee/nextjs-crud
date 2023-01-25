import { FunctionComponent } from 'react';
import Layout from '../components/layout/Layout';
import { RecoilRoot } from 'recoil';

import '../styles/index.scss';

interface AppProps {
  Component: FunctionComponent;
  pageProps: Record<string, unknown>;
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default MyApp;
