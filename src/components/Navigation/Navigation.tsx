import { Link } from 'react-router-dom';

import styles from './Navigation.module.scss';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.navItem}>
        Home
      </Link>
      <Link to="/phones" className={styles.navItem}>
        Phones
      </Link>
      <Link to="/tablets" className={styles.navItem}>
        Tablets
      </Link>
      <Link to="/accessories" className={styles.navItem}>
        Accessories
      </Link>
    </nav>
  );
};
