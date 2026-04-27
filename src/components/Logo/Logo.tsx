import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => (
  <Link to="/" className={styles.logo} aria-label="Go to home page">
    <span className={styles.badge}>PC</span>
    <span className={styles.text}>Product Catalog</span>
  </Link>
);
