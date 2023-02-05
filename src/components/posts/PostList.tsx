import PostItem from './PostItem';
import { Post, Posts } from 'pages';

const listStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const PostList = ({ posts }: Posts) => {
  return (
    <ul style={listStyle}>
      {posts?.reverse().map((post: Post) => (
        <PostItem
          key={post.collectionId}
          collectionId={post.collectionId}
          id={post.id}
          date={post.date}
          image={post?.image}
          title={post.title}
          address={post.address}
          description={post.description}
        />
      ))}
    </ul>
  );
};

export default PostList;
