import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyAJcNPCIpwmHcByaBeTct5DBZHau0oRrSI',
  authDomain: 'books-store-e76ce.firebaseapp.com',
  projectId: 'books-store-e76ce',
  storageBucket: 'books-store-e76ce.firebasestorage.app',
  messagingSenderId: '949422318999',
  appId: '1:949422318999:web:be57dd5f9ab5da03a310d2',
  measurementId: 'G-MP36BTH5KN',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const functions = getFunctions(app);
export { app };
