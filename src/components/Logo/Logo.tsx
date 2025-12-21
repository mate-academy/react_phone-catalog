import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img src="img/dark-logo.png" alt="logo" />
    </Link>
  );
};
