import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './SideMenu.module.scss';

// eslint-disable-next-line
import FavoritesIcon from '../../../assets/icons/aside-icons/favorites-icon.svg';
import CartIcon from '../../../assets/icons/aside-icons/cart-icon.svg';
import { getClassLink } from '../../utils/activeClassName';
import { useAppSelector } from '../../../store/hooks';

type Props = {
  isOpenSide: boolean;
  setIsOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideMenu: React.FC<Props> = ({ isOpenSide, setIsOpenSide }) => {
  const cartsProduct = useAppSelector(state => state.cart);
  const favoritesProduct = useAppSelector(state => state.favorites);

  const totalItems =
    Array.isArray(cartsProduct) &&
    cartsProduct.length > 0 &&
    cartsProduct.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <aside
      className={getClassLink({
        isActive: isOpenSide,
        baseClass: styles.menu,
        activeClass: styles.menu__open,
      })}
    >
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                getClassLink({
                  isActive,
                  baseClass: styles.menu__link,
                  activeClass: styles.menu__linkHover,
                })
              }
              onClick={() => setIsOpenSide(false)}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.menu__item}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                getClassLink({
                  isActive,
                  baseClass: styles.menu__link,
                  activeClass: styles.menu__linkHover,
                })
              }
              onClick={() => setIsOpenSide(false)}
            >
              Phones
            </NavLink>
          </li>
          <li className={styles.menu__item}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                getClassLink({
                  isActive,
                  baseClass: styles.menu__link,
                  activeClass: styles.menu__linkHover,
                })
              }
              onClick={() => setIsOpenSide(false)}
            >
              Tablets
            </NavLink>
          </li>
          <li className={styles.menu__item}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                getClassLink({
                  isActive,
                  baseClass: styles.menu__link,
                  activeClass: styles.menu__linkHover,
                })
              }
              onClick={() => setIsOpenSide(false)}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__icons}>
        <NavLink
          to="/favorites"
          className={styles.menu__favorites}
          onClick={() => setIsOpenSide(false)}
        >
          <img
            src={FavoritesIcon}
            alt="Улюблені товари"
            className={styles.menu__favoritesIcon}
          />
          {favoritesProduct.length > 0 && (
            <span className={styles.menu__cartBadge}>
              {favoritesProduct.length}
            </span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={styles.menu__cart}
          onClick={() => setIsOpenSide(false)}
        >
          <img src={CartIcon} alt="Кошик" className={styles.menu__cartIcon} />
          {totalItems && (
            <span className={styles.menu__cartBadge}>{totalItems}</span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
