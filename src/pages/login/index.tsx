import AuthForm from 'components/posts/AuthForm';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import { useRecoilState } from 'recoil';
import { loginState } from 'store/auth';
import { userState } from '../../store/auth';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);
  const [signInWithEmailAndPassword, userCredential, loading, error] = useSignInWithEmailAndPassword(auth);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (!form.email.includes("@")) {
    //   return setFormError("Please enter a valid email");
    // }

    // Valid form inputs
    signInWithEmailAndPassword(form.email, form.password);
    if (error) console.log('LoginPage - error: ', error);
    if (!error) router.push('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem(user.userName);
    console.log('storedUser', storedUser);
  }, []);

  return (
    <div>
      <AuthForm user={user.userName} form={form} onSubmit={handleSubmit} onChange={handleInputChange} />
    </div>
  );
};

export default LoginPage;
