import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { selectCartTotalQuantity } from '../../features/cart/cartSlice';
import { selectFavoritesCount } from '../../features/favorites/favoritesSlice';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import styles from './Menu.module.scss';

import logo from '../../assets/icons/logo.png';
import logoLight from '../../assets/icons/logo-light.png';
import { CartIcon, CloseIcon, HeartIcon } from '../iconsSVG';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  const cartCount = useAppSelector(selectCartTotalQuantity);
  const favCount = useAppSelector(selectFavoritesCount);
  const { theme } = useTheme();

  useLockBodyScroll(isOpen);

  return (
    <aside
      className={cn(styles.menu, { [styles['menu--open']]: isOpen })}
      aria-hidden={!isOpen}
      role="dialog"
      aria-label="Main menu"
    >
      <div className={styles.menu__top}>
        <Link to="/" className={styles.menu__logo} onClick={onClose}>
          <img src={theme === 'light' ? logoLight : logo} alt="Logo" />
        </Link>

        <button
          type="button"
          className={styles.menu__close}
          onClick={onClose}
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>
      </div>

      <nav className={styles.menu__nav} aria-label="Primary">
        <NavLink
          to="/"
          onClick={onClose}
          className={({ isActive }) =>
            cn(styles.menu__link, {
              [styles['menu__link--active']]: isActive,
            })
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          onClick={onClose}
          className={({ isActive }) =>
            cn(styles.menu__link, {
              [styles['menu__link--active']]: isActive,
            })
          }
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          onClick={onClose}
          className={({ isActive }) =>
            cn(styles.menu__link, {
              [styles['menu__link--active']]: isActive,
            })
          }
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          onClick={onClose}
          className={({ isActive }) =>
            cn(styles.menu__link, {
              [styles['menu__link--active']]: isActive,
            })
          }
        >
          Accessories
        </NavLink>
      </nav>

      <div className={styles.menu__bottom}>
        <NavLink
          to="/favorites"
          onClick={onClose}
          className={({ isActive }) =>
            cn(styles.menu__bottomBtn, {
              [styles['menu__bottomBtn--active']]: isActive,
            })
          }
          aria-label="Favorites"
        >
          <span className={styles.menu__iconWrap}>
            <HeartIcon />
            {favCount > 0 && (
              <span className={styles.menu__badge}>{favCount}</span>
            )}
          </span>
        </NavLink>

        <NavLink
          to="/cart"
          onClick={onClose}
          className={({ isActive }) =>
            cn(styles.menu__bottomBtn, {
              [styles['menu__bottomBtn--active']]: isActive,
            })
          }
          aria-label="Cart"
        >
          <span className={styles.menu__iconWrap}>
            <CartIcon />
            {cartCount > 0 && (
              <span className={styles.menu__badge}>{cartCount}</span>
            )}
          </span>
        </NavLink>
      </div>
    </aside>
  );
};
