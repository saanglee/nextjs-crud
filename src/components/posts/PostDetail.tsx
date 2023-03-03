import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/shared/Button';
import PostEditForm from 'components/shared/PostEditForm';
import Card from 'components/shared/Card';
import { Post } from 'pages';

import { auth } from '../../firebase/firebaseClient';
import { useIdToken } from 'react-firebase-hooks/auth';

import classes from './PostDetail.module.scss';

const PostDetail = ({ collectionId, id, date, image, title, address, description }: Post) => {
  const router = useRouter();

  const [user] = useIdToken(auth);
  const uid = user?.uid as string;

  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState({
    title,
    image,
    date,
    address,
    description,
    id,
    collectionId,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalContent({
      ...localContent,
      id,
      collectionId,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const updatePostHandler = async (updatedPostData: Post): Promise<any> => {
    try {
      const response = await fetch('/api/update-post', {
        method: 'POST',
        body: JSON.stringify(updatedPostData),
        headers: {
          uid,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
    return updatedPostData;
  };

  const handleUpdatedPostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePostHandler(localContent);
    refreshServerSide();
    toggleIsEdit();
  };

  const refreshServerSide = () => {
    router.replace(router.asPath);
  };
  return (
    <>
      <div />
      {isEdit ? (
        <div>
          <PostEditForm
            submitHandler={handleUpdatedPostSubmit}
            inputChangeHandler={handleInputChange}
            contents={localContent}
            handleQuitEdit={() => setIsEdit(false)}
            isEdit
          />
        </div>
      ) : (
        <Card date={localContent.date}>
          <section className={classes.detail}>
            {image && <img src={image} alt={title} />}
            <div className={classes.detail__content}>
              <h1>{localContent.title}</h1>
              <address>{localContent.address}</address>
              <p>{localContent.description} </p>
            </div>
            <div className={classes.actions}>
              <Button text="수정하기" onClick={toggleIsEdit} />
            </div>
          </section>
        </Card>
      )}
    </>
  );
};

export default PostDetail;
