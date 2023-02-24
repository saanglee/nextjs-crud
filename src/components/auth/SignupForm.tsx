import React, { useState } from 'react';
import Card from 'components/shared/Card';
import Button from 'components/shared/Button';
import classes from './index.module.scss';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/firebaseClient';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '../../firebase/errors';
import { UserCredential } from 'firebase/auth';

const SignupForm = () => {
  const router = useRouter();

  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [createUserWithEmailAndPassword, userCredential, loading, authError] = useCreateUserWithEmailAndPassword(auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSignupForm({
      ...signupForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleSubmitSignup = (event: React.FormEvent<HTMLFormElement>): void | Promise<UserCredential | undefined> => {
    event.preventDefault();
    if (error) setError('');
    if (signupForm.password !== signupForm.confirmPassword) return setError('동일한 비밀번호를 입력해주세요.');
    return createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };

  if (userCredential) {
    alert(`${userCredential.user.email}님 안녕하세요! 홈으로 이동합니다.`);
    router.push('/');
  }
  if (authError) {
    console.log('authError ', authError);
  }

  return (
    <div>
      <Card size="sm" date="SIGN UP">
        <h1 className={classes.login__title}> 회원가입 </h1>
        <form className={classes.login__form} onSubmit={handleSubmitSignup}>
          <div className={classes.control}>
            <label htmlFor="id">Email</label>
            <input
              name="email"
              placeholder="이메일"
              value={signupForm.email}
              type="email"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Password </label>
            <input
              name="password"
              placeholder="비밀번호"
              value={signupForm.password}
              type="password"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Password </label>
            <input
              name="confirmPassword"
              placeholder="비밀번호 재확인"
              value={signupForm.confirmPassword}
              type="password"
              required
              onChange={handleInputChange}
            />
          </div>

          {(error && <div className={classes.error_message}> {error} </div>) || (
            <div className={classes.error_message}>
              {FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
            </div>
          )}

          {loading ? (
            <div className={classes.loading_message}>회원가입 진행 중...</div>
          ) : (
            <>
              <div className={classes.login__button}>
                <Button type="submit" text="작성 완료 > " size="lg" />
              </div>

              <div className={classes.login__button}>
                <p> 계정이 있으신가요? </p>
                <Button type="submit" text="로그인하러 가기 < " size="lg" onClick={() => router.replace('/login')} />
              </div>
            </>
          )}
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;
