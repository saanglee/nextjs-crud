import cookies from 'js-cookie';

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth');
  if (!cookie) return;
  // eslint-disable-next-line consistent-return
  return JSON.parse(cookie);
};

export const setUserCookie = (user: any) => {
  cookies.set('auth', user, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  });
};

export const removeUserCookie = () => cookies.remove('auth');
