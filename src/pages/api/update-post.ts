// POST /api/new-post
import { db } from '../../firebase/firebaseClient';
import { doc, setDoc, GeoPoint, updateDoc } from 'firebase/firestore/lite';
import { NextApiRequest, NextApiResponse } from 'next';

const updateHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { uid } = request.headers;

  if (request.method === 'POST') {
    const data = request.body;
    try {
      // const userDoc = doc(db, 'myCollection', data.collectionId);
      const userDoc = doc(db, uid as string, data.collectionId); // TODO 확인 필요
      await updateDoc(userDoc, data);
      console.log('✅ 들어감');

      response.status(201).json({ message: '✅ Post updated!' });
    } catch (error) {
      console.log('❗️', error);
    }
  }
};

export default updateHandler;
