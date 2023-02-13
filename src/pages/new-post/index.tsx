import React from 'react';
import NewPost, { PostForm } from '../../components/posts/NewPost';
import { useRouter } from 'next/router';
import Message from 'components/shared/Message';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseClient';

const NewPostPage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const uid = user?.uid as string;

  if (loading) {
    return <div>로딩 중...</div>;
  }

  const addPostHandler = async (newPost: PostForm): Promise<any> => {
    try {
      const response = await fetch('/api/new-post', {
        method: 'POST',
        body: JSON.stringify(newPost),
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
    return newPost;
  };

  if (!user)
    return (
      <Message messageTitle="로그인 이후에 이용하실 수 있습니다." buttonText="로그인 페이지로 가기 →" linkTo="/login" />
    );
  return <NewPost addPostHandler={addPostHandler} />;
};

export default NewPostPage;
