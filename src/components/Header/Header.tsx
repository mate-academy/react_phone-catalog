import styles from './ Header.module.scss';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <Link to="/" className={styles.header__logo}>
          <img
            src="../public/img/logo.svg"
            alt="Nice Gadgets"
            className={styles.header__logo__img}
          />
        </Link>

        <ul className={styles.header__nav__list}>
          <li className={styles.header__nav__item}>
            <NavLink to="/" className={styles.header__nav__link}>
              HOME
            </NavLink>
          </li>
          <li className={styles.header__nav__item}>
            <NavLink to="/phones" className={styles.header__nav__link}>
              Phones
            </NavLink>
          </li>
          <li className={styles.header__nav__item}>
            <NavLink to="/tablets" className={styles.header__nav__link}>
              TABLETS
            </NavLink>
          </li>
          <li className={styles.header__nav__item}>
            <NavLink to="/accessories" className={styles.header__nav__link}>
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.header__buttons}>
        <NavLink
          to="/"
          className={`${styles.header__button} ${styles['header__button--icon-menu']}`}
        ></NavLink>
      </div>
    </header>
  );
};
