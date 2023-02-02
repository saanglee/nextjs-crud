import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccount.json';

const firebaseAdminConfig = {
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  projectId: serviceAccount.project_id,
};
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL: 'https://test-e2e5c-default-rtdb.asia-southeast1.firebasedatabase.app',
  });
}

export { admin };
