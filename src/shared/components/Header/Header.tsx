import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <a href="#" className={styles.header__logoLink}>
          <img
            src="src/assets/icons/header-icons/logo-icon.svg"
            alt="Логотип"
            className={styles.header__logo}
          />
        </a>

        <nav className={styles.header__nav}>
          <ul className={styles.header__list}>
            <li className={styles.header__item}>
              <a
                href="#"
                className={`${styles.header__link} ${styles.header__linkHover}`}
              >
                Home
              </a>
            </li>
            <li className={styles.header__item}>
              <a
                href="#"
                className={`${styles.header__link} ${styles.header__linkHover}`}
              >
                Phones
              </a>
            </li>
            <li className={styles.header__item}>
              <a
                href="#"
                className={`${styles.header__link} ${styles.header__linkHover}`}
              >
                Tablets
              </a>
            </li>
            <li className={styles.header__item}>
              <a
                href="#"
                className={`${styles.header__link} ${styles.header__linkHover}`}
              >
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.header__wrapper}>
          <a href="#" className={styles.header__favoritesLink}>
            <img
              src="src/assets/icons/header-icons/favorites-icon.svg"
              alt="Улюблені"
              className={styles.header__favoritesImg}
            />
          </a>
          <a href="#" className={styles.header__cartLink}>
            <img
              src="src/assets/icons/header-icons/cart-icon.svg"
              alt="Корзина"
              className={styles.header__cartImg}
            />
          </a>
          <a href="#" className={styles.header__menuLink}>
            <img
              src="src/assets/icons/header-icons/hamburger-icon.svg"
              alt="Меню"
              className={styles.header__menuImg}
            />
          </a>
        </div>
      </div>
    </header>
  );
};
