// POST /api/new-meetup
import { db } from '../../firebase/clientApp';
import { doc, setDoc, GeoPoint } from 'firebase/firestore/lite';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const timeStamp = Date.now().toString(); // FIXME 임시 userId

  if (request.method === 'POST') {
    const data = request.body;
    try {
      const userDoc = doc(db, 'myCollection', timeStamp);
      await setDoc(userDoc, data);
      response.status(201).json({ message: '✅ Meetup inserted!' });
    } catch (error) {
      console.log('❗️', error);
    }
  }
};

export default handler;
