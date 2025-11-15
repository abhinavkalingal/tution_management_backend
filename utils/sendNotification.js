// /**
//  * Utility wrapper for Firebase Admin SDK to send FCM notifications.
//  * Put your Firebase service account JSON at the path set in .env FIREBASE_SERVICE_ACCOUNT_PATH
//  *
//  * NOTE: Make sure you install firebase-admin (already present in package.json).
//  */

// const admin = require('firebase-admin');

// let initialized = false;
// function initFirebase() {
//   if (initialized) return;
//   const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
//   if (!serviceAccountPath) {
//     console.warn('FIREBASE_SERVICE_ACCOUNT_PATH not set. Notifications disabled.');
//     return;
//   }
//   try {
//     const serviceAccount = require(serviceAccountPath);
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount)
//     });
//     initialized = true;
//   } catch (err) {
//     console.error('Failed to initialize Firebase Admin SDK:', err.message);
//   }
// }

// const sendNotification = async (token, notification = { title: 'Title', body: 'Body' }, data = {}) => {
//   initFirebase();
//   if (!initialized) {
//     throw new Error('Firebase not initialized. Check FIREBASE_SERVICE_ACCOUNT_PATH.');
//   }

//   const message = {
//     token,
//     notification,
//     data: Object.keys(data || {}).reduce((acc, k) => {
//       acc[k] = String(data[k]);
//       return acc;
//     }, {})
//   };

//   try {
//     const response = await admin.messaging().send(message);
//     return response;
//   } catch (err) {
//     console.error('FCM Error:', err);
//     throw err;
//   }
// };

// module.exports = sendNotification;
