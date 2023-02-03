import * as admin from 'firebase-admin';

const firebaseAdminConfig = {
  privateKey: (process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL: 'https://test-e2e5c-default-rtdb.asia-southeast1.firebasedatabase.app',
  });
}

export { admin };
