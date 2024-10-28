import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const Header = () => {
  const getNavLinkClass = (isActive: boolean) => {
    return classNames(
      styles.header__link,
      isActive ? styles.header__link_active : '',
    );
  };

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;

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
        <button className={styles.header__icon} onClick={toggleTheme}>
          {theme === 'light' ? (
            <img
              className={styles.header__icon_img}
              src="icons/theme-light.svg"
              alt="cart icon"
            />
          ) : (
            <img
              className={styles.header__icon_img}
              src="icons/theme-dark.svg"
              alt="cart icon"
            />
          )}
        </button>
        <Link to="/favorites" className={styles.header__icon}>
          {theme === 'light' ? (
            <img
              className={styles.header__icon_img}
              src="icons/heart.svg"
              alt="heart icon"
            />
          ) : (
            <img
              className={styles.header__icon_img}
              src="icons/heart-dark.svg"
              alt="cart icon"
            />
          )}
        </Link>
        <Link to="/cart" className={styles.header__icon}>
          {theme === 'light' ? (
            <img
              className={styles.header__icon_img}
              src="icons/cart.svg"
              alt="cart icon"
            />
          ) : (
            <img
              className={styles.header__icon_img}
              src="icons/cart-dark.svg"
              alt="cart icon"
            />
          )}
        </Link>
      </div>
    </header>
  );
};
