import SignupForm from 'components/auth/LoginForm';
import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import nookies from 'nookies';
import { admin } from '../../firebase/firebaseAdmin';
import { useAuth } from 'store/authProvider';
import { useRouter } from 'next/router';

const LoginPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { user } = useAuth();
  if (user) {
    router.push('/');
  }
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const cookies1 = nookies.get(context);
    const token = await admin.auth().verifyIdToken(cookies1.token);
    const { uid, email } = token;
    console.log('getServerSideProps -------- ', uid);
    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (error) {
    console.log('getServerSideProps -------- ', error);
    // either the `token` cookie didn't exist or token verification failed
    // either way: redirect to the login page
    return {
      props: {} as never,
    };
  }
};

export default LoginPage;
