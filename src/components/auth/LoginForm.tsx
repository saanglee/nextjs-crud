import React, { useState, useEffect } from 'react';
import Card from 'components/shared/Card';
import Button from 'components/shared/Button';
import classes from './AuthForm.module.scss';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/firebaseClient';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '../../firebase/errors';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

interface LoginFormProps {
  onAddUser?: (enteredUserData: any) => Promise<any>; // TODO 삭제
}

const LoginForm = ({ onAddUser }: LoginFormProps) => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signInWithEmailAndPasswordL, userCredential, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // only client side
    setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPasswordL(loginForm.email, loginForm.password);
    });

    // nextjs server
    // const credential = await signInWithEmailAndPasswordL(loginForm.email, loginForm.password);
    // console.log('LoginForm - test:', credential);
    // JWT토큰 생성
    // const idToken = await credential?.user.getIdToken();
    // Next.js의 로그인 함수 호출
    // await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/json' },
    //   body: JSON.stringify({ idToken }),
    // });
    // 완료되면, 인증 받은 사용자만 접근 가능한 페이지로 라우팅
    // await router.push('/'); // FIXME 임시
  };

  useEffect(() => {
    if (userCredential) {
      router.push('/');
    }
    if (error) console.log('LoginForm - error.message: ', error.message);
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
