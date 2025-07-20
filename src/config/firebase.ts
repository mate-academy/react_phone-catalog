import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'ninjasjs-442ba.firebaseapp.com',
  databaseURL:
    'https://ninjasjs-442ba-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'ninjasjs-442ba',
  storageBucket: 'ninjasjs-442ba.firebasestorage.app',
  messagingSenderId: '417740997267',
  appId: '1:417740997267:web:b074fc02d013167e98c366',
  measurementId: 'G-1Y4Z6DZHP2',
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
