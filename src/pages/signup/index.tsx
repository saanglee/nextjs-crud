import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import AuthForm from 'components/posts/AuthForm';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { signupState, userState } from '../../store/auth';

const SignupPage = () => {
  const [form, setForm] = useRecoilState(signupState);
  const setUser = useSetRecoilState(userState);
  const [createUserWithEmailAndPassword, userCredential, loading, authError] = useCreateUserWithEmailAndPassword(auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (formError) setFormError("");
    // if (form.password !== form.confirmPassword) {
    //   return setFormError("Passwords do not match");
    // }
    createUserWithEmailAndPassword(form.email, form.password);
    if (userCredential) {
      console.log('회원가입 성공 - user: ', userCredential);
      const { user } = userCredential;
      const userEmail = user.email as string;
      const uId = user.uid as string;
      const userName = userEmail.split('@')[0];
      setUser({ userName, uId });
      localStorage.setItem(userName, userEmail);
    }
  };
  return (
    <div>
      <AuthForm isSignUp form={form} onSubmit={handleSubmit} onChange={handleInputChange} />
    </div>
  );
};

export default SignupPage;
