import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img src="img/logo/Logo.svg" alt="logo" className={styles.logo__img} />
    </Link>
  );
};
