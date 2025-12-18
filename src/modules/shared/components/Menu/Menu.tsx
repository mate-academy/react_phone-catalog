import React from 'react';
import styles from './Menu.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import CartIcon from '/img/icons/cart.svg';
import HeartIcon from '/img/icons/heart.svg';
import { useCart } from '@/modules/CartFavContext/CartContext';
import { links } from '../utils/constants/constants';
type MenuProps = {
  onClose?: () => void;
  isMenuOpen?: boolean;
};
const Menu: React.FC<MenuProps> = ({ onClose, isMenuOpen }) => {
  const { totalCount, totalFavoritesCount } = useCart();
  return (
    <div
      className={classNames(styles.menu__container, {
        [styles['menu__container--active']]: isMenuOpen,
      })}
    >
      <div className={classNames(styles.menu__content)}>
        <ul className={styles.menu__list}>
          {links.map(({ path, label }) => (
            <li key={path} className={styles.menu__item}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu__link} ${styles['menu__link--active']}`
                    : styles.menu__link
                }
                onClick={onClose}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.menu__footer}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__icon} ${styles['navbar__icon--active']}`
                : styles.navbar__icon
            }
            onClick={onClose}
          >
            <div className={styles.navbar__iconImage}>
              <img src={HeartIcon} alt="Favorites" />
              {totalFavoritesCount > 0 && (
                <div className={styles.navbar__iconCount}>
                  {totalFavoritesCount}
                </div>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__icon} ${styles['navbar__icon--active']}`
                : styles.navbar__icon
            }
            onClick={onClose}
          >
            <div className={styles.navbar__iconImage}>
              <img src={CartIcon} alt="Cart" />
              {totalCount > 0 && (
                <div className={styles.navbar__iconCount}>{totalCount}</div>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;
