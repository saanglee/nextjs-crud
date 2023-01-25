import Button from 'components/shared/Button';
import Form from 'components/shared/PostForm';
import Card from 'components/shared/Card';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import classes from './PostDetail.module.scss';

export interface PostDetailProps {
  collectionId?: string;
  id?: string;
  image: string;
  date: Date;
  title: string;
  address: string;
  description?: string;
}

const PostDetail = ({ collectionId, id, date, image, title, address, description }: PostDetailProps) => {
  const router = useRouter();
  const contents = {
    collectionId,
    title,
    image,
    date,
    address,
    description,
    id,
  };
  const [localContent, setLocalContent] = useState(contents);
  console.log('localContent.date', localContent.date);
  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalContent({
      ...localContent,
      id: contents.id,
      collectionId: contents.collectionId,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(contents);
  };

  const updateMeetupHandler = async (updatedMeetupData: any) => {
    try {
      const response = await fetch('/api/update-meetup', {
        method: 'POST',
        body: JSON.stringify(updatedMeetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
    return updatedMeetupData;
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMeetupHandler(localContent);
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
          <Form
            submitHandler={submitHandler}
            inputChangeHandler={handleInputChange}
            contents={localContent}
            handleQuitEdit={handleQuitEdit}
            isEdit
          />
        </div>
      ) : (
        <Card date={localContent.date}>
          <section className={classes.detail}>
            <img src={image} alt={title} />
            <div className={classes.detail__content}>
              <h1>{localContent.title}</h1>
              <address>{localContent.address} </address>
              <p>{localContent.description} </p>
            </div>
            <div className={classes.actions}>
              <Button text="수정하기" onClick={toggleIsEdit} />
              {/* <button onClick={toggleIsEdit}>수정하기</button> */}
            </div>
          </section>
        </Card>
      )}
    </>
  );
};

export default PostDetail;
