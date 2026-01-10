import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

const logoSrc = '/img/logos/Logo.svg';

export const Logo = () => (
  <Link to="/" className={styles.logo}>
    <img src={logoSrc} alt="Nice Gadgets" className={styles.image} />
  </Link>
);
