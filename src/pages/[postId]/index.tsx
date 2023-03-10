import React from 'react';
import { db } from '../../firebase/firebaseClient';
import { admin } from '../../firebase/firebaseAdmin';
import PostDetail from '../../components/posts/PostDetail';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

const PostDetails = ({ selectedItem }: any) => {
  if (selectedItem) {
    const { title, address, image, description, id, collectionId, date } = selectedItem[0];
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
  }
  return <div />;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  type params = { postId: string };
  try {
    const { postId } = context.params as params;

    const cookies = nookies.get(context);
    const token = await admin.auth().verifyIdToken(cookies.token);
    const { uid } = token;

    const q = query(collection(db, uid), where('id', '==', postId));
    const querySnapshot = await getDocs(q);

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

    return {
      props: { selectedItem },
    };
  } catch (error) {
    context.res.setHeader('Location', '/login');
    context.res.writeHead(302, { Location: '/login' });
    context.res.end();
    console.log('❗️ [postId] - getServerSideProps error: ', error);
    return {
      props: {} as never,
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
};

export default PostDetails;
