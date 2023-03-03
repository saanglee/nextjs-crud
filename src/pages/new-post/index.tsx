import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Message from 'components/shared/Message';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseClient';
import { getStringDate } from 'utils';
import nextId from 'react-id-generator';
import PostEditForm from 'components/shared/PostEditForm';

interface PostForm {
  title: string;
  image?: string;
  address: string;
  date: any;
  description: string;
  id: string;
}

const NewPostPage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const uid = user?.uid as string;

  const [newPost, setNewPost] = useState<PostForm>({
    title: '',
    image: '',
    address: '',
    date: getStringDate(new Date()),
    description: '',
    id: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({
      ...newPost,
      [event.currentTarget.name]: event.currentTarget.value,
      id: nextId('test-id-'),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewPost({
      title: '',
      image: '',
      date: '',
      address: '',
      description: '',
      id: '',
    });

    addPostHandler(newPost);
  };

  const addPostHandler = async (post: PostForm): Promise<any> => {
    try {
      const response = await fetch('/api/new-post', {
        method: 'POST',
        body: JSON.stringify(post),
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
    return post;
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user)
    return (
      <Message messageTitle="로그인 이후에 이용하실 수 있습니다." buttonText="로그인 페이지로 가기 →" linkTo="/login" />
    );

  return <PostEditForm submitHandler={handleSubmit} inputChangeHandler={handleInputChange} contents={newPost} />;
};

export default NewPostPage;
