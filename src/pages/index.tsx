import { auth, db, firebaseConfig } from '../firebase/clientApp';
import { collection, getDocs } from 'firebase/firestore/lite';
import PostList from '../components/posts/PostList';
import { useIdToken } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';

// const uid = onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log('user@@@', user, '======uid=====', user.uid);
//     return user.uid;
//   }
// });

const HomePage = (props: any) => {
  const { staticItems } = props;
  // const [user] = useIdToken(auth);
  // const uid = user?.uid as string;

  return <PostList posts={staticItems} />;
};

export const getStaticProps = async () => {
  console.log('================', auth.currentUser);

  // const SESSION_KEY = `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`;
  // const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_KEY) : null;
  // console.log('SESSION_KEY, accessToken', SESSION_KEY, ', ', accessToken);
  const querySnapshot = await getDocs(collection(db, 'myCollection'));
  // const querySnapshot = await getDocs(collection(db, uid));
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
