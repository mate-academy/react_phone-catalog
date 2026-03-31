import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import { useThemeStore } from '@/store/themeStore';

export const Logo = () => {
  const { theme } = useThemeStore();

  return (
    <Link to="/" className={styles.logo} aria-label="Nice Gadgets Home">
      <img
        src={theme === 'light' ? 'icons/logo.svg' : 'icons/logo-dark.svg'}
        className={styles.image}
        alt="Logo"
      />
    </Link>
  );
};
