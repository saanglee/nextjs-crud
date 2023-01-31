import Card from '../shared/Card';
import classes from './PostItem.module.css';
import { useRouter } from 'next/router';
import { db } from '../../firebase/firebaseClient';
import { doc, deleteDoc } from 'firebase/firestore/lite';
import Image from 'next/image';
import Button from 'components/shared/Button';
import { DeleteOutlined } from '@ant-design/icons';

const PostItem = ({ collectionId, id, date, image, title, address }: any) => {
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push(`/${id}`); // = Link Component
  };

  const deletePost = async (event: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    if (window.confirm(`"${title}" 를 삭제하시겠습니까?`)) {
      event.preventDefault();
      const docRef = doc(db, 'myCollection', targetId);
      await deleteDoc(docRef);
      alert(`${targetId} deleted successfully`);
      refreshServerSide();
    }
  };

  const refreshServerSide = () => {
    router.replace(router.asPath);
  };

  return (
    <li className={classes.item}>
      <Card date={date}>
        <div className={classes.content}>
          <h2>{title}</h2>
          <address>{address}</address>
        </div>
        <div className={classes.image}>
          {/* <img src={image} alt={title} /> */}

          <Image
            src={image}
            alt={title}
            placeholder="blur"
            blurDataURL="https://www.froben11.de/wp-content/uploads/2016/10/orionthemes-placeholder-image.png"
            width={500}
            height={500}
          />
        </div>
        <div className={classes.actions}>
          <Button text="SHOW MORE" size="lg" onClick={showDetailsHandler} />
          <Button text="DELETE" size="lg" onClick={(event: any) => deletePost(event, collectionId)}>
            <DeleteOutlined />
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default PostItem;
