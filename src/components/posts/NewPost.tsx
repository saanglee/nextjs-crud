import { useState } from 'react';
import nextId from 'react-id-generator';
import PostEditForm from 'components/shared/PostEditForm';
import { getStringDate } from 'utils';

export interface PostForm {
  title: string;
  image?: string;
  address: string;
  date: any;
  description: string;
  id: string;
}

interface NewPostProps {
  addPostHandler: (newPost: PostForm) => Promise<any>;
}

const NewPost = ({ addPostHandler }: NewPostProps) => {
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

    addPostHandler(newForm);
  };

  return <PostEditForm submitHandler={handleNewPostSubmit} inputChangeHandler={handleInputChange} contents={newForm} />;
};

export default NewPost;
