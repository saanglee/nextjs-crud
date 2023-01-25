import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from './clientApp';

export const signInWithGoogle: any = async () => signInWithPopup(auth, new GoogleAuthProvider());

export const signUpWithEmailAndPassword = async (_email: string, _password: string) => {};

export const loginWithEmaiAndPassword = async (_email: string, _password: string) => {};

export const logout = () => signOut(auth);
