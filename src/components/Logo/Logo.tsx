import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => (
  <Link to="/" className={styles.logo} aria-label="Home page">
    <span className={styles.line}>
      Nice
      <span className={styles.emoji} aria-hidden="true">
        👌
      </span>
    </span>
    <span className={styles.line}>Gadgets</span>
  </Link>
);
