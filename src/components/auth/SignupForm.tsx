import React, { useState, useEffect, useCallback } from 'react';
import Card from 'components/shared/Card';
import Button from 'components/shared/Button';
import classes from './index.module.scss';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/firebaseClient';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '../../firebase/errors';
import { UserCredential } from 'firebase/auth';

interface SignupFormProps {
  isSignUp?: boolean;
  form?: any;
  user?: any;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void | Promise<UserCredential | undefined> => {
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
    console.log(authError);
  }

  return (
    <div>
      w
      <Card size="sm" date="SIGN UP">
        <form className={classes.login__form} onSubmit={handleSubmit}>
          <div className={classes.control}>
            <label htmlFor="id">Email</label>
            <input name="email" value={signupForm.email} type="email" required onChange={handleInputChange} />
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Password </label>
            <input name="password" value={signupForm.password} type="password" required onChange={handleInputChange} />
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Password </label>
            <input
              name="confirmPassword"
              value={signupForm.confirmPassword}
              type="password"
              required
              onChange={handleInputChange}
            />
          </div>
          {error && <div className={classes.error_message}> {error} </div>}
          <div className={classes.error_message}>
            {FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
          </div>
          {loading ? (
            <div>회원가입 진행 중...</div>
          ) : (
            <div className={classes.login__button}>
              <Button type="submit" text="회원가입 > " size="lg" />
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;
