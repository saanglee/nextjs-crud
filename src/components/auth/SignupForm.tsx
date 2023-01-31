import React, { useState, useEffect } from 'react';
import Card from 'components/shared/Card';
import Button from 'components/shared/Button';
import classes from './AuthForm.module.scss';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/firebaseClient';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({
      ...signupForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError('');
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('동일한 비밀번호를 입력해주세요.');
    }
    createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };

  if (userCredential) {
    if (window.confirm(`OO님 안녕하세요, 로그인 페이지로 이동하시겠습니까?`)) router.push('/login');
  }

  return (
    <div>
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
          {error && <div> {error} </div>}
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
