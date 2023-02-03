import React from 'react';
import NewPostForm, { PostForm } from '../../components/posts/NewPost';
import { useRouter } from 'next/router';
import { useAuth } from 'store/authProvider';

const NewPostPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const uid = user?.uid as string;

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

  if (!user) return <div> 로그인을 해주세요! 로그인 페이지로 가기</div>;
  return <NewPostForm addPostHandler={addPostHandler} />;
};

export default NewPostPage;
