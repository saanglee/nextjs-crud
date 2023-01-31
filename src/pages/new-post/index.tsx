import React from 'react';
import NewPostForm from '../../components/posts/NewPostForm';
import { useRouter } from 'next/router';
import { useIdToken } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseClient';

const NewMeepupPage = () => {
  const router = useRouter();
  const [user] = useIdToken(auth);
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

  return <NewPostForm onAddPost={addPostHandler} />;
};

export default NewMeepupPage;
