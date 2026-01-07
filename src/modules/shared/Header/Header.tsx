import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './Header.module.scss';
import iconCart from 'public/img/icons/icon-shopping-bag-cart.png';
// eslint-disable-next-line max-len
import iconFavorite from 'public/img/icons/icon-favourites-heart-like.png';
import iconLogo from 'public/img/icons/icon-logo.png';
import { Link, NavLink } from 'react-router-dom';
import { useProducts } from 'src/context/ProductsContext';

export const Header: React.FC = () => {
  const { favorites, cart } = useProducts();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites, cart]);

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img
              src={iconLogo}
              className={styles.header__logo__img}
              alt="logo"
            />
          </Link>
        </div>
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
            <img className={styles.header__but__link__img} src={iconFavorite} />
            <p>{favorites.length}</p>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles.header__but__link, { [styles.active]: isActive })
            }
          >
            <img className={styles.header__but__link__img} src={iconCart} />
            <p>{cart.length}</p>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
