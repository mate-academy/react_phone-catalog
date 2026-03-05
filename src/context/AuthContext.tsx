import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { auth, firestore } from '@/firebase/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

type UserData = {
  name?: string;
  email?: string;
  discount?: boolean;
};

type AuthContextType = {
  currentUser: User | null;
  userData: UserData | null;
  userLoggedIn: boolean;
  loading: boolean;
  consumeDiscount: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function initializeUser(user: User | null) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);

      try {
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Помилка завантаження даних користувача:', error);
      }
    } else {
      setCurrentUser(null);
      setUserData(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const consumeDiscount = useCallback(async () => {
    if (!currentUser) return;

    const userRef = doc(firestore, 'users', currentUser.uid);
    await updateDoc(userRef, { discount: false });
    setUserData((prev) => (prev ? { ...prev, discount: false } : prev));
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    userLoggedIn,
    loading,
    consumeDiscount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
