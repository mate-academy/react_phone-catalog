import React from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import styles from './NavMenu.module.scss';
import classNames from 'classnames';
import { useCart } from '../../../context/CartContext';
import { useFavorites } from '../../../context/FavoritesContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

type Props = {
  isOpenMenu: boolean;
  handleMenuClose: () => void;
  type: 'tablet' | 'mobile';
};

export const NavMenu: React.FC<Props> = ({
  isOpenMenu,
  handleMenuClose,
  type,
}) => {
  const { pathname } = useLocation();
  const [searchParam] = useSearchParams();
  const { totalItems: totalCartItems } = useCart();
  const { totalFavorites: totalFavoriteItems } = useFavorites();

  return (
    <nav
      className={classNames(styles.menu, {
        [styles.menu_open]: isOpenMenu && type === 'mobile',
        [styles.menu_tablet]: type === 'tablet',
        [styles.menu_mobile]: type === 'mobile',
      })}
    >
      <ul className={classNames(styles.menu__list)}>
        {navLinks.map(link => (
          <li key={link.to} className={styles.menu__item}>
            <NavLink
              to={link.to}
              onClick={handleMenuClose}
              className={({ isActive }) =>
                classNames(styles.menu__link, {
                  [styles['menu__link--active']]: isActive,
                })
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.menu__icons}>
        <NavLink
          to="/favorites"
          state={{ prevLocation: pathname, search: searchParam.toString() }}
          className={({ isActive }) =>
            classNames(styles.menu__icon, {
              [styles['menu__icon--active']]: isActive,
            })
          }
          onClick={handleMenuClose}
        >
          <img
            className={styles.menu__iconImg}
            src="./icons/favourites-heart-like.svg"
            alt="Favorites"
            // height={16}
          />
          {totalFavoriteItems > 0 && (
            <span className={styles.menu__count}>{totalFavoriteItems}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          state={{ prevLocation: pathname, search: searchParam.toString() }}
          className={({ isActive }) =>
            classNames(styles.menu__icon, {
              [styles['menu__icon--active']]: isActive,
            })
          }
          onClick={handleMenuClose}
        >
          <img
            className={styles.menu__iconImg}
            src="./icons/shopping-bag-cart.svg"
            alt="Cart"
            // height={16}
          />
          {totalCartItems > 0 && (
            <span className={styles.menu__count}>{totalCartItems}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
