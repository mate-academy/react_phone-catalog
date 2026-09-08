import { useContext } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';
import { FavoritesContext } from '../../context/FavoriteProvider';
import { MenuContext } from '../../context/MenuProvider';
import { CartContext } from '../../context/CartProvider';

type Props = {
  classNamesProps: string[];
};

export const Navigation: React.FC<Props> = ({ classNamesProps }) => {
  const { cartProducts } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const { isMenuVisible, setIsMenuVisible } = useContext(MenuContext);

  const favoritesCount = favorites.length;
  const cartCountItems = cartProducts.reduce((totalCount, curentCount) => {
    return totalCount + curentCount.quantity;
  }, 0);

  const toggleMenu = () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
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
            home
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
            tablets
          </NavLink>
        </li>

        <li className={styles.nav__item}>
          <NavLink
            to="../accessories"
            className={({ isActive }) => getLinkStyle(isActive)}
            onClick={toggleMenu}
          >
            accessories
          </NavLink>
        </li>
      </ul>

      <ul className={classNames(styles.nav__favorites, classNamesProps[1])}>
        <li
          className={classNames(
            styles.nav__item,
            styles['nav__item--favorite'],
          )}
        >
          <NavLink
            to="../favorites"
            className={({ isActive }) =>
              getLinkStyle(
                isActive,
                styles['nav__link--favorite'],
                styles.favorites,
                'icon',
                'icon--like',
              )
            }
            onClick={toggleMenu}
          >
            {favoritesCount !== 0 && (
              <span className={styles.favorites__count}>{favoritesCount}</span>
            )}
          </NavLink>
        </li>

        <li
          className={classNames(
            styles.nav__item,
            styles['nav__item--favorite'],
          )}
        >
          <NavLink
            to="../cart"
            className={({ isActive }) =>
              getLinkStyle(
                isActive,
                styles['nav__link--favorite'],
                styles.favorites,
                'icon',
                'icon--cart',
              )
            }
            onClick={toggleMenu}
          >
            {cartCountItems !== 0 && (
              <span className={styles.favorites__count}>{cartCountItems}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
