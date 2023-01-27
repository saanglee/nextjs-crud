import SignupForm from 'components/auth/LoginForm';
import React from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  // const addUserHandler = async (enteredUserData: any) => {
  //   try {
  //     const response = await fetch('/api/login', {
  //       method: 'POST',
  //       body: JSON.stringify(enteredUserData),
  //       // body: enteredUserData,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const data = await response.json();
  //     // router.push('/');
  //     console.log('💡 LoginPage - addUserHandler - data: ', data);

  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return enteredUserData;
  // };
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default LoginPage;
