import React, { useState, useEffect } from 'react';
import Card from 'components/shared/Card';
import Button from 'components/shared/Button';
import classes from './AuthForm.module.scss';
import { useRouter } from 'next/router';

interface AuthFormProps {
  isSignUp?: boolean;
  form?: any;
  user?: any;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm = ({ isSignUp = false, user, form, onSubmit, onChange }: AuthFormProps) => {
  const router = useRouter();
  const [formTitle, setFormTitle] = useState('Log In');
  useEffect(() => {
    if (isSignUp) setFormTitle('Sign Up');
  }, []);

  const handleSignupBtnClick = () => {
    router.push('/signup');
  };

  return (
    <div>
      <Card size="sm" date={formTitle}>
        {user && <h1> {user}님 안녕하세요! 이제 로그인하실 수 있습니다:) </h1>}
        <form className={classes.login__form} onSubmit={onSubmit}>
          <div className={classes.control}>
            <label htmlFor="id">Email</label>
            <input name="email" value={form.email} type="email" required onChange={onChange} id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password </label>
            <input name="password" value={form.password} type="password" required onChange={onChange} id="password" />
          </div>
          {isSignUp ? (
            <div className={classes.login__button}>
              <Button type="submit" text="회원가입 > " size="lg" />
            </div>
          ) : (
            <>
              <div className={classes.login__button}>
                <Button type="submit" text="로그인" size="lg" />
              </div>
              <div className={classes.login__button}>
                <p> 회원이 아니신가요? </p>
                <Button text="회원가입> " size="lg" onClick={handleSignupBtnClick} />
              </div>
            </>
          )}
        </form>
      </Card>
    </div>
  );
};

export default AuthForm;
