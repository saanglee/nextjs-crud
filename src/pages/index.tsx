import { GetServerSidePropsContext } from 'next';
import PostList from 'components/posts/PostList';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseClient';
import { admin } from '../firebase/firebaseAdmin';
import nookies from 'nookies';
import { useAuth } from 'store/authProvider';
import Card from 'components/shared/Card';

const HomePage = ({ userPosts }: any) => {
  const { user } = useAuth();
  if (!user) return <div> 로그인을 해주세요! 로그인 페이지로 가기</div>;
  if (!userPosts?.length)
    return (
      <div>
        <Card>
          <h1 style={{ margin: 50, fontSize: 25 }}>포스팅을 작성해보세요!</h1>
        </Card>
      </div>
    );
  return <PostList posts={userPosts} />;
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<{ props: {} }> => {
  try {
    const cookies = nookies.get(context);
    const token = await admin.auth().verifyIdToken(cookies.token);
    const { uid } = token;
    const querySnapshot = await getDocs(collection(db, uid));
    const userPosts = querySnapshot.docs.map((doc) => {
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
        userPosts: JSON.parse(JSON.stringify(userPosts)),
      },
    };
  } catch (error) {
    console.log('❗️ HomePage - getServerSideProps error: ', error);
    return {
      // redirect: {
      //   permanent: false,
      //   destination: '/login',
      // },
      props: {} as never,
    };
  }
};

export default HomePage;
