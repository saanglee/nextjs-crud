import React, { Fragment } from 'react';
import { db } from '../../firebase/clientApp';
import PostDetail from '../../components/posts/PostDetail';

import { collection, getDocs, query, where } from 'firebase/firestore/lite';

// const PostDetails = (selectedItem: any, { title, address, image, description, id, collectionId }: any) => {
const PostDetails = (props: any) => {
  const { selectedItem } = props;
  const { title, address, image, description, id, collectionId, date } = selectedItem[0];
  console.log('collectionId', collectionId);

  return (
    <PostDetail
      image={image}
      title={title}
      address={address}
      description={description}
      id={id}
      collectionId={collectionId}
      date={date}
    />
  );
};

export const getStaticPaths = async () => {
  const querySnapshot = await getDocs(collection(db, 'myCollection'));

  const paths = querySnapshot.docs.map((doc) => {
    console.log(doc);
    return {
      params: {
        collectionId: doc.id,
        postId: doc.data().id,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: { params: { postId: string } }) => {
  const { postId } = context.params;

  const q = query(collection(db, 'myCollection'), where('id', '==', postId));

  const querySnapshot = await getDocs(q);

  // const collectionId = querySnapshot.forEach((doc) => {
  //   console.log(doc.id, ' => ', doc.data());
  //   return doc.id;
  // });

  const selectedItem = querySnapshot.docs.map((doc) => {
    return {
      collectionId: doc.id,
      id: doc.data().id,
      title: doc.data().title,
      address: doc.data().address,
      date: doc.data().date,
      image: doc.data().image,
      description: doc.data().description,
    };
  });

  console.log('⭐️selectedItem⭐️', selectedItem);

  return {
    props: {
      selectedItem: selectedItem.map((item) => ({
        description: item.description,
        title: item.title,
        address: item.address,
        date: item.date,
        image: item.image,
        id: item.id,
        collectionId: item.collectionId,
      })),
    },
  };
};

export default PostDetails;
