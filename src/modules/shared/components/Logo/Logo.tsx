import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => (
  <Link to="/" className={styles.logo} aria-label="Nice Gadgets home">
    <span className={styles.nice}>NICE</span>
    <span className={styles.gadgets}>GADGETS</span>
  </Link>
);
