import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo} aria-label="Nice Gadgets Home">
      <img src="/icons/logo.svg" className={styles.image} alt="Logo" />
    </Link>
  );
};
