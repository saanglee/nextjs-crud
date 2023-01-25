import PostItem from './PostItem';
import classes from './PostList.module.css';
import { collection } from 'firebase/firestore/lite';

const PostList = ({ meetups }: any) => {
  return (
    <ul className={classes.list}>
      {meetups.reverse().map((meetup: any) => (
        <PostItem
          key={meetup.collectionId}
          collectionId={meetup.collectionId}
          id={meetup.id}
          date={meetup.date}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
};

export default PostList;
