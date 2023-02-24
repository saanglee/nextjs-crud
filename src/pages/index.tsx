import { GetServerSidePropsContext } from 'next';
import Card from 'components/shared/Card';
import PostList from 'components/posts/PostList';

import { collection, getDocs } from 'firebase/firestore/lite';
import { auth, db } from '../firebase/firebaseClient';
import { admin } from '../firebase/firebaseAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';

import nookies from 'nookies';
import Message from 'components/shared/Message';

export interface Post {
  collectionId: string;
  id: string;
  title: string;
  date: string;
  image: string;
  address: string;
  description: string;
}

export interface Posts {
  posts: Post[];
}

const HomePage = ({ posts }: Posts) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user)
    return (
      <Message messageTitle="로그인 이후에 이용하실 수 있습니다." buttonText="로그인 페이지로 가기 →" linkTo="/login" />
    );

  if (!posts?.length)
    return (
      <div>
        <Card>
          <h1 style={{ margin: 50, fontSize: 25 }}>포스팅을 작성해보세요!</h1>
        </Card>
      </div>
    );
  return <PostList posts={posts} />;
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<{ props: {} }> => {
  try {
    const cookies = nookies.get(context);
    const token = await admin.auth().verifyIdToken(cookies.token);
    const { uid } = token;
    const querySnapshot = await getDocs(collection(db, uid));
    const userPosts: Post[] = querySnapshot.docs.map((doc) => {
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
      props: { posts: userPosts },
    };
  } catch (error) {
    context.res.writeHead(302, { Location: '/login' });
    context.res.end();
    return {
      props: {} as never,
    };
  }
};

export default HomePage;
