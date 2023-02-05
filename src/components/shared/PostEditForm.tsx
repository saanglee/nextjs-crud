import React from 'react';
import Card from 'components/shared/Card';
import classes from './PostEditForm.module.scss';
import Button from './Button';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface FormProps {
  submitHandler: any;
  inputChangeHandler: any;
  handleQuitEdit?: any;
  contents: any;

  isEdit?: boolean;
}

const PostEditForm = ({ submitHandler, inputChangeHandler, handleQuitEdit, contents, isEdit = false }: FormProps) => {
  return (
    <Card date={contents.date}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Post Title</label>
          <input name="title" value={contents.title} type="text" required onChange={inputChangeHandler} id="title" />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Post Image</label>
          <input name="image" value={contents.image} type="url" onChange={inputChangeHandler} id="image" />
        </div>
        <div className={classes.control}>
          <label htmlFor="date">오늘 날짜</label>
          <input name="date" value={contents.date} type="date" required onChange={inputChangeHandler} id="date" />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            name="address"
            value={contents.address}
            type="text"
            required
            onChange={inputChangeHandler}
            id="address"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={contents.description}
            id="description"
            required
            onChange={inputChangeHandler}
            rows={5}
          />
        </div>
        {isEdit ? (
          <div className={classes.actions__edit}>
            <Button size="lg" onClick={handleQuitEdit} text="취소" />
            <Button size="lg" type="submit" text="완료" />
          </div>
        ) : (
          <div className={classes.actions__add}>
            <Button text="ADD Post" type="submit" />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor="image">Post Image</label>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </div>
      </form>
    </Card>
  );
};

export default PostEditForm;
