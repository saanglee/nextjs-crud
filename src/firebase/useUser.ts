import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from './clientApp';
import { removeUserCookie, setUserCookie, getUserFromCookie } from './userCookie';
import { mapUserData } from './mapUserData';

type UserData = {
  id: string;
  email: string;
};

const useUser = () => {
  const [userState, setUserState] = useState<UserData | null>();
  const router = useRouter();

  const logout = async () => {
    try {
      await auth.signOut();
      removeUserCookie();
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are both kept up to date
    const cancelAuthListener = auth.onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUserCookie(userData);
        setUserState(userData);
      } else {
        removeUserCookie();
        setUserState(null);
      }
    });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      router.push('/login');
    }
    setUserState(userFromCookie);
    return () => {
      cancelAuthListener();
    };
  }, []);
  return { userState, logout };
};

export { useUser };
