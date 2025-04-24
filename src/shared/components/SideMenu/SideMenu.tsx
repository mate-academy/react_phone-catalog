import { Link } from 'react-router-dom';
import styles from './SideMenu.module.scss';

export const SideMenu = () => {
  return (
    <aside className={styles.menu} id="menu">
      <header className={styles.menu__container}>
        <Link to="/" className={styles.menu__logoLink}>
          <img
            src="src/assets/icons/header-icons/logo-icon.svg"
            alt="Логотип"
            className={styles.menu__logo}
          />
        </Link>

        <button className={styles.menu__close}>
          <img
            src="src/assets/icons/aside-icons/aside-close-icon.svg"
            alt="Закрити меню"
            className={styles.menu__closeMenu}
          />
        </button>
      </header>

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
            src="src/assets/icons/aside-icons/favorites-icon.svg"
            alt="Улюблені товари"
            className={styles.menu__favoritesIcon}
          />
        </Link>
        <Link to="/cart" className={styles.menu__cart}>
          <img
            src="src/assets/icons/aside-icons/cart-icon.svg"
            alt="Кошик"
            className={styles.menu__cartIcon}
          />
        </Link>
      </div>
    </aside>
  );
};
