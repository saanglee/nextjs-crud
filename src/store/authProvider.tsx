import React, { useState, useEffect, useContext, createContext } from 'react';
import { getAuth, User } from 'firebase/auth';
import nookies from 'nookies';

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return getAuth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`);
      if (!user) {
        console.log(`no token found...`);
        setUser(null);
        nookies.set(null, 'token', '', { path: '/' });
        return;
      }

      console.log(`updating token...`);
      const token = await user.getIdToken();
      setUser(user);
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });
  }, []);
  // force refresh the token every 10 minutes
  useEffect(() => {
    const handler = setInterval(async () => {
      const { currentUser } = getAuth();
      if (currentUser) await currentUser.getIdToken(true);
    }, 10 * 60 * 1000);
    // clean up setInverval
    return () => clearInterval(handler);
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
