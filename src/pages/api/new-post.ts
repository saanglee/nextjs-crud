// POST /api/new-post
import { db } from '../../firebase/firebaseClient';
import { doc, setDoc, Timestamp } from 'firebase/firestore/lite';
import { NextApiRequest, NextApiResponse } from 'next';

const addPosthandler = async (request: NextApiRequest, response: NextApiResponse) => {
  const timeStamp = Date.now().toString(); // = post id
  const { uid } = request.headers;

  if (request.method === 'POST') {
    const data = request.body;
    console.log('data.header.uid -> ', request.headers.uid);

    try {
      const userDoc = doc(db, uid as string, timeStamp);
      await setDoc(userDoc, data);
      response.status(201).json({ message: '✅ Post inserted!' });
    } catch (error) {
      console.log('❗️', error);
    }
  }
};

export default addPosthandler;
