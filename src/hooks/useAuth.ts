import { useEffect, useState } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from '../firebase';
import type { User } from 'firebase/auth';

export const useAuth = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(maybeUser => {
      setUser(maybeUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const handleSignIn = async () => {
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(auth, googleAuthProvider);
      setUser(credentials.user);
    } catch (err) {
      console.error('Sign in error:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return {
    user,
    loading,
    handleSignIn,
    handleSignOut,
  };
};
