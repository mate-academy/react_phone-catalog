import { useEffect, useState, type FC } from 'react';
import login from '/icons/login.svg';
import styles from './UserMenuButton.module.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import iconExit from '/icons/exit.png';
import { useCartActionsStore } from '../../hooks/useCartAndFavorites';

export const UserMenuButton: FC = () => {
  const [isUserAuth, setIsUserAuth] = useState(false);
  const { clearCart, loadFromStorage } = useCartActionsStore();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuth(true);
      } else {
        setIsUserAuth(false);
      }
    });

    return () => listen();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      clearCart();

      localStorage.removeItem('NICE_GADGETS_STORE_FAVORITES');

      loadFromStorage();

      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isUserAuth) {
    return (
      <button
        onClick={handleLogout}
        className={styles.loginButton}
        title="Logout"
      >
        <img
          src={iconExit}
          alt="Logout"
          className={clsx(styles.loginIcon, 'app-icon')}
        />
      </button>
    );
  }

  return (
    <Link
      to="/login"
      className={styles.loginButton}
    >
      <img
        src={login}
        alt="Login"
        className={clsx(styles.loginIcon, 'app-icon')}
      />
    </Link>
  );
};
