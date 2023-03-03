import React, { useState, useEffect } from 'react';
import Card from 'components/shared/Card';
import Button from 'components/shared/Button';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { auth } from '../../firebase/firebaseClient';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '../../firebase/errors';
import { browserSessionPersistence, setPersistence } from 'firebase/auth';
import googleButton from '../../assets/images/googleButton.png';

import classes from './index.module.scss';

const LoginForm = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signInWithEmailAndPassword, userCredential, loading, authError] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, _, googleLoading, googleAuthError] = useSignInWithGoogle(auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(loginForm.email, loginForm.password);
    });
  };

  useEffect(() => {
    if (userCredential) {
      router.push('/', undefined, { shallow: true });
    }
    if (authError) console.log('LoginForm - error.message: ', authError.message);

    if (googleAuthError) console.log('LoginForm - error.message: ', googleAuthError.message);
  }, [handleSubmit]);

  return (
    <div>
      <Card size="sm" date="LOG IN">
        <h1 className={classes.login__title}> 로그인 </h1>
        <form className={classes.login__form} onSubmit={handleSubmit}>
          <div className={classes.control}>
            <label htmlFor="id">Email</label>
            <input name="email" type="email" placeholder="이메일" required onChange={handleInputChange} id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password </label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              onChange={handleInputChange}
              id="password"
            />
          </div>
          <div className={classes.error_message}>
            {FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
          </div>
          {googleLoading && <div className={classes.login__loading}>로그인 진행 중...</div>}
          {loading ? (
            <div className={classes.login__loading}>로그인 진행 중...</div>
          ) : (
            <>
              <div className={classes.login__button}>
                <Button type="submit" text="로그인" size="lg" />
              </div>
              <div className={classes.login__button}>
                <button type="button" onClick={() => signInWithGoogle()}>
                  <Image src={googleButton} alt="google logo" width={260} />
                </button>
              </div>
              <div className={classes.login__button}>
                <p> 회원이 아니신가요? </p>
                <Button
                  text="회원가입> "
                  size="lg"
                  onClick={() => {
                    router.push('/signup');
                  }}
                />
              </div>
            </>
          )}
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
