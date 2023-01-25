import React from 'react';
import NewPostForm from '../../components/posts/NewPostForm';
import { useRouter } from 'next/router';

const NewMeepupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData: any) => {
    try {
      const response = await fetch('/api/new-meetup', {
        method: 'POST',
        body: JSON.stringify(enteredMeetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      router.push('/');
      return data;
    } catch (error) {
      console.log(error);
    }
    return enteredMeetupData;
  };

  return <NewPostForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeepupPage;
