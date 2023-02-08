import SignupForm from 'components/auth/SignupForm';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'context/authProvider';

const SignupPage = () => {
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

export default SignupPage;
