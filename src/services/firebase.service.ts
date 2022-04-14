import admin from 'firebase-admin';
// import serviceAccount from 'configs/firebase-service-account.json';

const serviceAccount = require('configs/firebase-service-account.json');

export const init = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any)
  });
};
