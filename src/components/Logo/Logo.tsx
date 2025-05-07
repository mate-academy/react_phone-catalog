import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

export const Logo = () => (
  <Link to="/" className={styles.logo}>
    <div className={styles.logo__box}>
      <p>Nice</p>
      <img
        className={styles.icon__logo}
        src="img/icons/favicon.png"
        alt="img logo"
      />
    </div>
    <p>Gadgets</p>
  </Link>
);
