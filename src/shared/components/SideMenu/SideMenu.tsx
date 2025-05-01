import { Link } from 'react-router-dom';

import styles from './SideMenu.module.scss';

// eslint-disable-next-line
import FavoritesIcon from '../../../assets/icons/aside-icons/favorites-icon.svg';
import CartIcon from '../../../assets/icons/aside-icons/cart-icon.svg';

export const SideMenu = () => {
  return (
    <aside className={styles.menu}>
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link
              to="/"
              className={`${styles.menu__link} ${styles.menu__linkHover}`}
            >
              Home
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link
              to="/phones"
              className={`${styles.menu__link} ${styles.menu__linkHover}`}
            >
              Phones
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link
              to="/tablets"
              className={`${styles.menu__link} ${styles.menu__linkHover}`}
            >
              Tablets
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link
              to="/accessories"
              className={`${styles.menu__link} ${styles.menu__linkHover}`}
            >
              Accessories
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__icons}>
        <Link to="/favorites" className={styles.menu__favorites}>
          <img
            src={FavoritesIcon}
            alt="Улюблені товари"
            className={styles.menu__favoritesIcon}
          />
        </Link>
        <Link to="/cart" className={styles.menu__cart}>
          <img src={CartIcon} alt="Кошик" className={styles.menu__cartIcon} />
        </Link>
      </div>
    </aside>
  );
};
