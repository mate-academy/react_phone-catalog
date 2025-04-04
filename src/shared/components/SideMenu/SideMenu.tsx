import styles from './SideMenu.module.scss';

export const SideMenu = () => {
  return (
    <aside className={styles.menu} id="menu">
      <header className={styles.header__container}>
        <a href="#" className={styles.header__logoLink}>
          <img
            src="src/assets/icons/header-icons/logo-icon.svg"
            alt="Логотип"
            className={styles.header__logo}
          />
        </a>

        <a href="#" className={styles.header__close}>
          <img
            src="src/assets/icons/aside-icons/aside-close-icon.svg"
            alt="Закрити меню"
            className={styles.header__closeMenu}
          />
        </a>
      </header>

      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <a
              href="#"
              className={`${styles.nav__link} ${styles.nav__linkHover}`}
            >
              Home
            </a>
          </li>
          <li className={styles.nav__item}>
            <a
              href="#"
              className={`${styles.nav__link} ${styles.nav__linkHover}`}
            >
              Phones
            </a>
          </li>
          <li className={styles.nav__item}>
            <a
              href="#"
              className={`${styles.nav__link} ${styles.nav__linkHover}`}
            >
              Tablets
            </a>
          </li>
          <li className={styles.nav__item}>
            <a
              href="#"
              className={`${styles.nav__link} ${styles.nav__linkHover}`}
            >
              Accessories
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__icons}>
        <a href="#" className={styles.menu__favorites}>
          <img
            src="src/assets/icons/aside-icons/favorites-icon.svg"
            alt="Закрити меню"
            className={styles.menu__favoritesIcon}
          />
        </a>
        <a href="#" className={styles.menu__cart}>
          <img
            src="src/assets/icons/aside-icons/cart-icon.svg"
            alt="Закрити меню"
            className={styles.menu__cartIcon}
          />
        </a>
      </div>
    </aside>
  );
};
