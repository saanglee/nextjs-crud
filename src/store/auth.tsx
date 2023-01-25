import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: {
    email: '',
    password: '',
  },
});

export const signupState = atom({
  key: 'signupState',
  default: {
    email: '',
    password: '',
  },
});

export const userState = atom({
  key: 'userState',
  default: {
    user: '',
    uId: '',
  },
});
