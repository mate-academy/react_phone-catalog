import { useEffect, useState, useCallback } from 'react';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { app } from './firebase';
import { Loader } from './components/Loader/Loader';
import { googleAuthProvider } from './GoogleAuthProvider';
import type { User } from 'firebase/auth';

export const AuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const handleSignIn = useCallback(async () => {
    try {
      setLoading(true);
      const credentials = await signInWithPopup(auth, googleAuthProvider);
      setUser(credentials.user);
    } catch (err) {
      console.error('Sign in error:', err);
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(maybeUser => {
      if (maybeUser != null) {
        setUser(maybeUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);

        if (!sessionStorage.getItem('authAttempted')) {
          sessionStorage.setItem('authAttempted', 'true');
          handleSignIn();
        }
      }
    });

    return unsubscribe;
  }, [auth, handleSignIn]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('authAttempted');
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (user != null) {
    return (
      <div>
        <div>Привіт, {user.displayName}!</div>
        <button onClick={handleSignOut}>Вийти</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleSignIn}>Увійти через Google</button>
    </div>
  );
};
