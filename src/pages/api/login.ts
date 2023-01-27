import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

// TODO 삭제
const loginHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  const loginData = request.body;
  try {
    console.log('⭐️ loginHandler - loginData: ', loginData);

    response.status(201).json({ message: '✅ login' });
  } catch (error) {
    console.log(error);
  }
};

export default loginHandler;
