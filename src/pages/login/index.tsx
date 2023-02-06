import React from 'react';
import { useRouter } from 'next/router';
import LoginForm from 'components/auth/LoginForm';
import { useAuth } from 'store/authProvider';
import Head from 'next/head';

const LoginPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  if (user) {
    router.push('/');
  }
  return (
    <>
      <Head>
        <title>login</title>
      </Head>
      <LoginForm />
    </>
  );
};

export default LoginPage;
