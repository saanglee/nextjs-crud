// POST /api/new-meetup
import { db } from '../../firebase/clientApp';
import { doc, setDoc, GeoPoint, updateDoc } from 'firebase/firestore/lite';
import { NextApiRequest, NextApiResponse } from 'next';

const updateHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  console.log('========== updateHandler ==========');
  if (request.method === 'POST') {
    console.log('========== request.method, POST ==========');
    const data = request.body;
    console.log('========== request.body = data :', data);
    console.log('========== request.body = data.id :', data.collectionId);
    try {
      const userDoc = doc(db, 'myCollection', data.collectionId);
      await updateDoc(userDoc, data);
      console.log('✅ 들어감');

      response.status(201).json({ message: '✅ Meetup updated!' });
    } catch (error) {
      console.log('❗️', error);
    }
  }
};

export default updateHandler;
