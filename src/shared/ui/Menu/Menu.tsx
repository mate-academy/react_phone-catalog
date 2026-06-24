import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import { links } from '@/shared/constants/links';
import styles from './Menu.module.scss';
import { selectCartTotalCount } from '@/store/slices/cartSlice';
import { useSelector } from 'react-redux';
import { selectFavoritesCount } from '@/store/slices/favoritesSlice';
import { IconCart } from '@/shared/ui/Icons/IconCart';
import { IconHeartFilled } from '@/shared/ui/Icons/IconHeartFilled';

type MenuProps = {
  onClose?: () => void;
  isMenuOpen?: boolean;
};
const Menu: React.FC<MenuProps> = ({ onClose, isMenuOpen }) => {
  const totalCount = useSelector(selectCartTotalCount);
  const totalFavoritesCount = useSelector(selectFavoritesCount);

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
            <div className={styles['navbar__iconImage--container']}>
              <IconHeartFilled className={styles.navbar__iconImage} />
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
            <div className={styles['navbar__iconImage--container']}>
              <IconCart className={styles.navbar__iconImage} />

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
