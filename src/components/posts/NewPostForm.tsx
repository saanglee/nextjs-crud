import { useState } from 'react';
import nextId from 'react-id-generator';
import PostForm from 'components/shared/PostForm';

import { auth } from '../../firebase/firebaseClient';
import { useIdToken } from 'react-firebase-hooks/auth';

const getStringDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

interface Post {
  title: string;
  image: string;
  address: string;
  date: any;
  description: string;
  id: string;
}

const NewPostForm = (props: any) => {
  const user = useIdToken(auth);
  const [newForm, setNewForm] = useState<Post>({
    title: '',
    image: '',
    address: '',
    date: getStringDate(new Date()),
    description: '',
    id: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewForm({
      ...newForm,
      [event.currentTarget.name]: event.currentTarget.value,
      id: nextId('test-id-'),
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // initialize form
    setNewForm({
      title: '',
      image: '',
      date: '',
      address: '',
      description: '',
      id: '',
    });

    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    props.onAddPost(newForm);
  };

  return <PostForm submitHandler={submitHandler} inputChangeHandler={handleInputChange} contents={newForm} />;
};

export default NewPostForm;
