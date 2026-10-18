import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => (
  <Link to="/" className={styles.logo} aria-label="Nice Gadgets">
    <span className={styles.logo__line}>
      Nice<span className={styles.logo__emoji}>👌</span>
    </span>
    <span className={styles.logo__line}>Gadgets</span>
  </Link>
);
