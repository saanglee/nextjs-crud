import React, { useState, useEffect } from 'react';
import Card from 'components/shared/Card';
import Button from 'components/shared/Button';
import classes from './AuthForm.module.scss';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/clientApp';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '../../firebase/errors';
import { browserSessionPersistence, setPersistence } from 'firebase/auth';

interface LoginFormProps {
  onAddUser?: (enteredUserData: any) => Promise<any>; // TODO 삭제
}

const LoginForm = ({ onAddUser }: LoginFormProps) => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signInWithEmailAndPassword, userCredential, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // client side
    setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(loginForm.email, loginForm.password);
    });
    loginHandler(userData);
  };

  useEffect(() => {
    if (userCredential) {
      router.push('/');
    }
    if (error) console.log(error.message);
  }, [handleSubmit]);

  const userData = { refreshToken: userCredential?.user.refreshToken, uid: userCredential?.user.uid };

  const loginHandler = async (user: any) => {
    try {
      const response = await fetch('api/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card size="sm" date="LOG IN">
        <form className={classes.login__form} onSubmit={handleSubmit}>
          <div className={classes.control}>
            <label htmlFor="id">Email</label>
            <input name="email" type="email" required onChange={handleInputChange} id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password </label>
            <input name="password" type="password" required onChange={handleInputChange} id="password" />
          </div>
          <div>{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</div>
          {loading ? (
            <div>로그인 진행 중...</div>
          ) : (
            <>
              <div className={classes.login__button}>
                <Button type="submit" text="로그인" size="lg" />
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
