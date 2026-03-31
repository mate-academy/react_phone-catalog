import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import { useThemeStore } from '@/store/themeStore';

export const Logo = () => {
  const { theme } = useThemeStore();

  return (
    <Link to="/" className={styles.logo} aria-label="Nice Gadgets Home">
      <img
        src={
          theme === 'light'
            ? `${import.meta.env.BASE_URL}icons/logo.svg`
            : `${import.meta.env.BASE_URL}icons/logo-dark.svg`
        }
        className={styles.image}
        alt="Logo"
      />
    </Link>
  );
};
