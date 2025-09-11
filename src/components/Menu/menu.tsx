import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { TopBar } from '../topbar';
import styles from './menu.module.scss';

export const Menu = () => {
  return (
    <aside id="Menu" className={styles.menu}>
      <TopBar isAside={true} />
      <Navigation isAside={true} />

      <div className={styles.menu__bottomNavigation}>
        <Link
          to="/favorites"
          className={`${styles.menu__navigationItem} ${styles['menu__navigationItem--left']}`}
        >
          <img
            src="public/img/icons/favorites.svg"
            className={`${styles.icon} ${styles['icon--favs']}`}
          />
        </Link>

        <Link to="/cart" className={styles.menu__navigationItem}>
          <img
            src="public/img/icons/cart.svg"
            className={`${styles.icon} ${styles['icon--cart']}`}
          />
        </Link>
      </div>
    </aside>
  );
};
