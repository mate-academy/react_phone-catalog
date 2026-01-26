import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import styles from './Header.module.scss';
import iconCart from 'public/img/icons/icon-shopping-bag-cart.png';
// eslint-disable-next-line max-len
import iconFavorite from 'public/img/icons/icon-favourites-heart-like.png';
import iconLogo from 'public/img/icons/icon-logo.png';
import iconBurger from 'public/img/icons/icon-menu.png';
import iconLight from 'public/img/icons/icon-light-theme.png';
import iconDark from 'public/img/icons/icon-dark-theme.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useProducts } from 'src/context/ProductsContext';
import { ThemeContext } from 'src/theme/ThemeProvider';

export const Header: React.FC = () => {
  const { favorites, cart } = useProducts();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites, cart]);

  const [theme, setTheme] = useContext(ThemeContext) || ['light', () => {}];

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img
              src={iconLogo}
              className={styles.header__logo__img}
              alt="logo"
            />
          </Link>
          <button className={styles.header__theme_but} onClick={changeTheme}>
            <img
              src={theme === 'light' ? iconDark : iconLight}
              alt="theme toggle"
              className={styles.header__theme_but__img}
            />
          </button>
        </div>
        <div className={styles.header__wrapper}>
          <div className={styles.header__nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(styles.header__nav__link, { [styles.active]: isActive })
              }
            >
              <p className={styles.header__nav__link__p}>home</p>
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                cn(styles.header__nav__link, { [styles.active]: isActive })
              }
            >
              <p className={styles.header__nav__link__p}>phones</p>
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                cn(styles.header__nav__link, { [styles.active]: isActive })
              }
            >
              <p className={styles.header__nav__link__p}>tablets</p>
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                cn(styles.header__nav__link, { [styles.active]: isActive })
              }
            >
              <p className={styles.header__nav__link__p}>accessories</p>
            </NavLink>
          </div>
          <div className={styles.header__but}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                cn(styles.header__but__link, { [styles.active]: isActive })
              }
            >
              <img
                className={styles.header__but__link__img}
                src={iconFavorite}
              />
              {favorites.length > 0 && (
                <span className={styles.header__but__link__img_p}>
                  {favorites.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(styles.header__but__link, { [styles.active]: isActive })
              }
            >
              <img className={styles.header__but__link__img} src={iconCart} />
              {cart.length > 0 && (
                <span className={styles.header__but__link__img_p}>
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>
        <NavLink
          to="/burgermenu"
          state={{ from: location.pathname }}
          className={({ isActive }) =>
            cn(
              styles.header__but__link,
              { [styles.active]: isActive },
              styles.header__but__phone,
            )
          }
        >
          <img className={styles.header__but__link__img} src={iconBurger} />
        </NavLink>
      </header>
    </>
  );
};
