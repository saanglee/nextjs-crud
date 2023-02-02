import { getApp, getApps, initializeApp } from 'firebase/app';
import * as firebaseClient from 'firebase/app';
import { connectAuthEmulator, getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, setDoc } from 'firebase/firestore/lite';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: 'https://test-e2e5c-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
// const functions = getFunctions(app);
// connectFunctionsEmulator(functions, 'localhost', 5001);
// connectAuthEmulator(auth, 'http://localhost:9099');

// if (typeof window !== 'undefined' && !firebaseClient.getApps().length) {
//   firebaseClient.initializeApp(firebaseConfig);
//   // auth.setPersistence(auth.Persistence.SESSION);
//   (window as any).firebase = firebaseClient;
// }

export { app, firebaseClient, auth, db };
