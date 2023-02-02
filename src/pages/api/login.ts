import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { firebaseAuth as auth } from '../../firebase/firebaseAdmin';

import type { IronSessionOptions } from 'iron-session';
import { Value } from 'classnames';

export type User = {
  isLoggedIn: boolean;
  login: string;
  avatarUrl: string;
};

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'iron-session/examples/next.js',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
    value?: Value;
  }
}

export default withIronSessionApiRoute(async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  const { idToken } = request.body;
  if (!idToken) {
    response.status(401);
    throw new Error('no valid idToken');
  }
  const expiresIn = 60 * 60 * 24 * 1000; // 밀리초 단위로, 만료 기간을 정해준다. iron session의 만료 시간과 맞춰주는 것이 좋다.
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn,
  });

  request.session.value = sessionCookie;

  await request.session.save();
}, sessionOptions);
