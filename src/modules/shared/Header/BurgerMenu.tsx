import styles from './Header.module.scss';
import iconCart from 'public/img/icons/icon-shopping-bag-cart.png';
// eslint-disable-next-line max-len
import iconFavorite from 'public/img/icons/icon-favourites-heart-like.png';
import iconLogo from 'public/img/icons/icon-logo.png';
import iconClose from 'public/img/icons/icon-close.png';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useEffect } from 'react';
import { useProducts } from 'src/context/ProductsContext';

export const BurgerMenu: React.FC = () => {
  const { favorites, cart } = useProducts();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites, cart]);

  return (
    <aside className={styles.menu} id="burgermenu">
      <div className={styles.menu__logo}>
        <Link to="/">
          <img src={iconLogo} className={styles.menu__logo__img} alt="logo" />
        </Link>
        <Link to="/">
          <img
            src={iconClose}
            className={styles.menu__but__link__img}
            alt="logo"
          />
        </Link>
      </div>
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__nav__ul}>
          <li className={styles.menu__nav__ul__li}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(styles.menu__nav__ul__li__link, {
                  [styles.active]: isActive,
                })
              }
            >
              Home
            </NavLink>
          </li>
          <li className={styles.menu__nav__ul__li}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                cn(styles.menu__nav__ul__li__link, {
                  [styles.active]: isActive,
                })
              }
            >
              Phones
            </NavLink>
          </li>
          <li className={styles.menu__nav__ul__li}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                cn(styles.menu__nav__ul__li__link, {
                  [styles.active]: isActive,
                })
              }
            >
              Tablets
            </NavLink>
          </li>
          <li className={styles.menu__nav__ul__li}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                cn(styles.menu__nav__ul__li__link, {
                  [styles.active]: isActive,
                })
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.header__but}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            cn(styles.header__but__link, { [styles.active]: isActive })
          }
        >
          <img className={styles.header__but__link__img} src={iconFavorite} />
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
    </aside>
  );
};
