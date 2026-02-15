import styles from './Header.module.scss';
import iconCart from 'public/img/icons/icon-shopping-bag-cart.png';
// eslint-disable-next-line max-len
import iconFavorite from 'public/img/icons/icon-favourites-heart-like.png';
import iconLogo from 'public/img/icons/icon-logo.png';
import iconClose from 'public/img/icons/icon-close.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useEffect } from 'react';
import { useProducts } from 'src/context/ProductsContext';

export const BurgerMenu: React.FC = () => {
  const { favorites, cart, totalCartQuantity } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '';

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites, cart]);

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return from === '/';
    }

    return from.startsWith(path);
  };

  return (
    <aside className={styles.menu} id="burgermenu">
      <div className={styles.menu__logo}>
        <Link to="/">
          <img src={iconLogo} className={styles.menu__logo__img} alt="logo" />
        </Link>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.menu__but__link}
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <img
            src={iconClose}
            alt="close"
            className={styles.menu__but__link__img}
            style={{ pointerEvents: 'none' }}
          />
        </button>
      </div>
      <div className={styles.menu__wrapper}>
        <nav className={styles.menu__nav}>
          <ul className={styles.menu__nav__ul}>
            <li className={styles.menu__nav__ul__li}>
              <NavLink
                to="/"
                className={cn(styles.menu__nav__ul__li__link, {
                  [styles.active]: isLinkActive('/'),
                })}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.menu__nav__ul__li}>
              <NavLink
                to="/phones"
                className={cn(styles.menu__nav__ul__li__link, {
                  [styles.active]: isLinkActive('/phones'),
                })}
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.menu__nav__ul__li}>
              <NavLink
                to="/tablets"
                className={cn(styles.menu__nav__ul__li__link, {
                  [styles.active]: isLinkActive('/tablets'),
                })}
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.menu__nav__ul__li}>
              <NavLink
                to="/accessories"
                className={cn(styles.menu__nav__ul__li__link, {
                  [styles.active]: isLinkActive('/accessories'),
                })}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.menu__but}>
          <NavLink
            to="/favourites"
            className={cn(styles.menu__but__link_bottom, {
              [styles.active]: isLinkActive('/favourites'),
            })}
          >
            <img
              className={styles.menu__but__link_bottom__img}
              src={iconFavorite}
            />
            {favorites.length > 0 && (
              <span className={styles.menu__but__link_bottom__img_p}>
                {favorites.length}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={cn(styles.menu__but__link_bottom, {
              [styles.active]: isLinkActive('/cart'),
            })}
          >
            <img
              className={styles.menu__but__link_bottom__img}
              src={iconCart}
            />
            {totalCartQuantity > 0 && (
              <span className={styles.menu__but__link_bottom__img_p}>
                {totalCartQuantity}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
