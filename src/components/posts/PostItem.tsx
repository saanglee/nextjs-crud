import { useRouter } from 'next/router';
import Image from 'next/image';
import Card from '../shared/Card';
import Button from 'components/shared/Button';
import { Post } from 'pages';

import { db } from '../../firebase/firebaseClient';
import { doc, deleteDoc } from 'firebase/firestore/lite';
import { useAuth } from 'store/authProvider';

import classes from './PostItem.module.scss';
import { DeleteOutlined } from '@ant-design/icons';

const PostItem = ({ collectionId, id, date, image, title, address }: Post) => {
  const router = useRouter();
  const { user } = useAuth();
  const uid = user?.uid;

  const deletePost = async (event: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    if (window.confirm(`"${title}" 를 삭제하시겠습니까?`)) {
      event.preventDefault();
      const docRef = doc(db, uid as string, targetId);
      await deleteDoc(docRef);
      alert('삭제 완료');
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
        {image && (
          <div className={classes.image}>
            <Image
              src={image}
              alt={title}
              placeholder="blur"
              blurDataURL="https://www.froben11.de/wp-content/uploads/2016/10/orionthemes-placeholder-image.png"
              width={500}
              height={500}
            />
          </div>
        )}
        <div className={classes.actions}>
          <Button text="SHOW MORE" size="lg" onClick={() => router.push(`/${id}`)} />
          <Button text="DELETE" size="lg" onClick={(event: any) => deletePost(event, collectionId)}>
            <DeleteOutlined />
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default PostItem;
