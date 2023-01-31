import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccount.json';

const firebaseAdminConfig = {
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  projectId: serviceAccount.project_id,
};

if (!admin.app.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL: `https://${serviceAccount.project_id}.firebaseid.com`,
  });
}

export { admin };
