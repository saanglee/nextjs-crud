import PostItem from './PostItem';
import classes from './PostList.module.css';
import { collection } from 'firebase/firestore/lite';

const PostList = ({ posts }: any) => {
  return (
    <ul className={classes.list}>
      {posts.reverse().map((post: any) => (
        <PostItem
          key={post.collectionId}
          collectionId={post.collectionId}
          id={post.id}
          date={post.date}
          image={post.image}
          title={post.title}
          address={post.address}
        />
      ))}
    </ul>
  );
};

export default PostList;
