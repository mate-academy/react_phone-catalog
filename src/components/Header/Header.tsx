import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  const getNavLinkClass = (isActive: boolean) => {
    return classNames(
      styles.header__link,
      isActive ? styles.header__link_active : '',
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Link to="/">
          <h4 className={styles.logo}>
            NICE&#128076;
            <br />
            GADGETS
          </h4>
        </Link>
        <nav className={styles.header__nav}>
          <ul className={styles.header__list}>
            <li className={styles.header__item}>
              <NavLink
                to="/"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/phones"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/tablets"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/accessories"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.header__toolbar}>
        <Link to="/favorites" className={styles.header__icon}>
          <img
            className={styles.header__icon_img}
            src="/icons/heart.svg"
            alt="heart icon"
          />
        </Link>
        <Link to="/cart" className={styles.header__icon}>
          <img
            className={styles.header__icon_img}
            src="/icons/cart.svg"
            alt="cart icon"
          />
        </Link>
      </div>
    </header>
  );
};
