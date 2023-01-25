import { db } from '../firebase/clientApp';
import { collection, getDocs } from 'firebase/firestore/lite';
import PostList from '../components/posts/PostList';

const HomePage = (props: any) => {
  const { staticItems } = props;
  return <PostList meetups={staticItems} />;
};

export const getStaticProps = async () => {
  const querySnapshot = await getDocs(collection(db, 'myCollection'));
  const staticItems = querySnapshot.docs.map((doc) => {
    return {
      collectionId: doc.id,
      id: doc.data().id,
      title: doc.data().title,
      date: doc.data().date,
      image: doc.data().image,
      address: doc.data().address,
      description: doc.data().description,
    };
  });

  return {
    props: {
      staticItems: JSON.parse(JSON.stringify(staticItems)),
    },
  };
};

export default HomePage;
