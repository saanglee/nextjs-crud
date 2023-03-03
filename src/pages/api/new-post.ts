// POST /api/new-post
import { db } from '../../firebase/firebaseClient';
import { doc, setDoc } from 'firebase/firestore/lite';
import { NextApiRequest, NextApiResponse } from 'next';

const addPostToStore = async (request: NextApiRequest, response: NextApiResponse) => {
  const postId = Date.now().toString();
  const { uid } = request.headers;

  if (request.method === 'POST') {
    const data = request.body;

    try {
      const userDoc = doc(db, uid as string, postId);
      await setDoc(userDoc, data);
      response.status(201).json({ message: '✅ Post inserted!' });
    } catch (error) {
      console.log(error);
    }
  }
};

export default addPostToStore;
