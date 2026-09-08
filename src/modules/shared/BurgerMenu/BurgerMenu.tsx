import styles from './BurgerMenu.module.scss';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../../app/store/GlobalContext';

const navLink = [
  { to: '/', tab: 'Home' },
  { to: '/phones', tab: 'Phones' },
  { to: '/tablets', tab: 'Tablets' },
  { to: '/accessories', tab: 'Accessories' },
];

export const BurgerMenu = () => {
  const getLinkActive = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.burgerMenu__link, {
      [styles.activeBurgerLink]: isActive,
    });
  };

  const { setIsMenuClose, totalCartItems, totalFavoritesItems } = useContext(GlobalContext);

  return (
    <div className={styles.burgerMenu}>
      <ul className={styles.burgerMenu__list}>
        {navLink.map(({ to, tab }) => (
          <li className={styles.burgerMenu__item} key={to}>
            <NavLink
              to={to}
              className={getLinkActive}
              onClick={() => setIsMenuClose(true)}
            >
              {tab}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.burgerMenu__icons}>
        <Link
          className={classNames(styles.burgerMenu__icon, {
            [styles.burgerMenu__icon_heart]: true,
          })}
          to="favorites"
          onClick={() => setIsMenuClose(true)}
        >
          {totalFavoritesItems > 0 ? (
            <div className={styles.burgerMenu__countIcon}>
              {totalFavoritesItems}
            </div>
          ) : null}
        </Link>
        <Link
          className={classNames(styles.burgerMenu__icon, {
            [styles.burgerMenu__icon_cart]: true,
          })}
          to="cart"
          onClick={() => setIsMenuClose(true)}
        >
          {totalCartItems > 0 ? (
            <div className={styles.burgerMenu__countIcon}>{totalCartItems}</div>
          ) : null}
        </Link>
      </div>
    </div>
  );
};
