import { initializeApp } from 'firebase/app';
const API_KEY = import.meta.env.VITE_API_KEY;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'nicegadgets-29beb.firebaseapp.com',
  projectId: 'nicegadgets-29beb',
  storageBucket: 'nicegadgets-29beb.firebasestorage.app',
  messagingSenderId: '285541934864',
  appId: '1:285541934864:web:e830cd4ac2548f1242e795',
  measurementId: 'G-XW4ZRQ5RE7',
};

export const app = initializeApp(firebaseConfig);
