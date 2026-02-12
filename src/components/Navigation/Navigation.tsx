import React, { useContext } from 'react';
import styles from './Navigation.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { MenuContext } from '../../context/MenuProvider';
import { FavouriteContext } from '../../context/FavouriteProvider';
import { CartContext } from '../../context/CartProvider';

interface Props {
  classNamesProps: string[];
}

export const Navigation: React.FC<Props> = ({ classNamesProps }) => {
  const { isVisibleMenu, setIsVisibleMenu } = useContext(MenuContext);
  const { favourites } = useContext(FavouriteContext);
  const { cartProducts } = useContext(CartContext);

  const favouritesAmount = favourites.length;
  const cartProductsAmount = cartProducts.reduce((totalCount, { quantity }) => {
    return totalCount + quantity;
  }, 0);

  const toggleMenu = () => {
    if (isVisibleMenu) {
      setIsVisibleMenu(false);
    }
  };

  const getLinkStyle = (isActive: boolean, ...classes: string[]) => {
    return classNames(styles.nav__link, ...classes, {
      [styles[`nav__link--active`]]: isActive,
    });
  };

  return (
    <nav className={classNames(styles.nav, classNamesProps[0])}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <NavLink
            to="/"
            className={({ isActive }) => getLinkStyle(isActive)}
            onClick={toggleMenu}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="../phones"
            className={({ isActive }) => getLinkStyle(isActive)}
            onClick={toggleMenu}
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="../tablets"
            className={({ isActive }) => getLinkStyle(isActive)}
            onClick={toggleMenu}
          >
            Tablets
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="../accessories"
            className={({ isActive }) => getLinkStyle(isActive)}
            onClick={toggleMenu}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
      <ul className={classNames(styles.nav__actions, classNamesProps[1])}>
        <li
          className={classNames(styles.nav__item, styles['nav__item--action'])}
        >
          <NavLink
            to="../favorites"
            className={({ isActive }) =>
              getLinkStyle(
                isActive,
                styles['nav__link--action'],
                styles.favourites,
                'icon',
                'icon--like',
              )
            }
            onClick={toggleMenu}
          >
            {favouritesAmount !== 0 && (
              <span className={styles.favourites__count}>
                {favouritesAmount}
              </span>
            )}
          </NavLink>
        </li>
        <li
          className={classNames(styles.nav__item, styles['nav__item--action'])}
        >
          <NavLink
            to="../cart"
            className={({ isActive }) =>
              getLinkStyle(
                isActive,
                styles['nav__link--action'],
                styles.favourites,
                'icon',
                'icon--cart',
              )
            }
            onClick={toggleMenu}
          >
            {cartProductsAmount !== 0 && (
              <span className={styles.favourites__count}>
                {cartProductsAmount}
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
