import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  await setDoc(doc(firestore, 'users', user.uid), {
    name: name,
    email: email,
    discount: true,
  });

  return userCredential;
};

export const doSingInWithEmailAndPassword = (
  email: string,
  password: string,
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSingInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const user = result.user;
  const userRef = doc(firestore, 'users', user.uid);

  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      name: user.displayName || '',
      email: user.email || '',
      discount: true,
    });
  }

  return result;
};

export const doSingOut = () => {
  return auth.signOut();
};
