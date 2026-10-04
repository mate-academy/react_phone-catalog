import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import { useTheme } from '@/shared/context/FavoriteContext/useTheme';

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <Link className={styles.logo} to="/">
      {theme === 'light' ? (
        <img src="./icons/logo.svg" />
      ) : (
        <img src="./icons/logo-white.svg" />
      )}
    </Link>
  );
};
