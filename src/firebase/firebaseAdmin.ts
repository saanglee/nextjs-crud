import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// @ts-ignore
const firebaseApp = global.firebaseApp ?? initializeApp();
// @ts-ignore
global.firebaseApp = firebaseApp;

export const firebaseAuth = getAuth(firebaseApp);
