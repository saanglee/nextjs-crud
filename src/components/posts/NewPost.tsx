import { useState } from 'react';
import nextId from 'react-id-generator';
import PostForm from 'components/shared/PostForm';

const getStringDate = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

export interface PostForm {
  title: string;
  image?: string;
  address: string;
  date: any;
  description: string;
  id: string;
}

const NewPostForm = ({ addPostHandler }: any) => {
  const [newForm, setNewForm] = useState<PostForm>({
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

  const handleNewPostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewForm({
      title: '',
      image: '',
      date: '',
      address: '',
      description: '',
      id: '',
    });

    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    addPostHandler(newForm);
  };

  return <PostForm submitHandler={handleNewPostSubmit} inputChangeHandler={handleInputChange} contents={newForm} />;
};

export default NewPostForm;
