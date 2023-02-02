import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { getAuth, User } from 'firebase/auth';
import nookies from 'nookies';

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user1) => {
      console.log(`token changed!`);
      if (!user1) {
        console.log(`no token found...`);
        setUser(null);
        nookies.set(null, 'token', '', { path: '/' });
        return;
      }

      console.log(`updating token...`, user1);
      setUser(user1);
      const token = await user1.getIdToken();
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });
  }, []);

  useEffect(() => {
    const handler = setInterval(async () => {
      const { currentUser } = getAuth();
      if (currentUser) await currentUser.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handler);
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
