import React from 'react';
import NewPostForm from '../../components/posts/NewPostForm';
import { useRouter } from 'next/router';
import { useIdToken } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseClient';
import { useAuth } from 'store/authProvider';

const NewPostPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const uid = user?.uid as string;

  const addPostHandler = async (enteredPostData: any) => {
    try {
      const response = await fetch('/api/new-post', {
        method: 'POST',
        body: JSON.stringify(enteredPostData),
        headers: {
          uid,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      router.push('/');
      return data;
    } catch (error) {
      console.log(error);
    }
    return enteredPostData;
  };

  if (!user) return <div> 로그인을 해주세요! 로그인 페이지로 가기</div>;
  return <NewPostForm onAddPost={addPostHandler} />;
};

export default NewPostPage;
