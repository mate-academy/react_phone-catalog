import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './SideMenu.module.scss';

import { FavoritesStateContext } from '../../store/FavoritesProvider';
import { CartStateContext } from '../../store/CartProvider';

// eslint-disable-next-line
import FavoritesIcon from '../../../assets/icons/aside-icons/favorites-icon.svg';
import CartIcon from '../../../assets/icons/aside-icons/cart-icon.svg';

type Props = {
  setIsOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideMenu: React.FC<Props> = ({ setIsOpenSide }) => {
  const favoritesProduct = useContext(FavoritesStateContext);
  const cartsProduct = useContext(CartStateContext);

  const totalItems =
    Array.isArray(cartsProduct) &&
    cartsProduct.length > 0 &&
    cartsProduct.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <aside className={styles.menu}>
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link
              to="/"
              className={`${styles.menu__link} ${styles.menu__linkHover}`}
              onClick={() => setIsOpenSide(false)}
            >
              Home
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link
              to="/phones"
              className={`${styles.menu__link} ${styles.menu__linkHover}`}
              onClick={() => setIsOpenSide(false)}
            >
              Phones
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link
              to="/tablets"
              className={`${styles.menu__link} ${styles.menu__linkHover}`}
              onClick={() => setIsOpenSide(false)}
            >
              Tablets
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link
              to="/accessories"
              className={`${styles.menu__link} ${styles.menu__linkHover}`}
              onClick={() => setIsOpenSide(false)}
            >
              Accessories
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__icons}>
        <Link
          to="/favorites"
          className={styles.menu__favorites}
          onClick={() => setIsOpenSide(false)}
        >
          <img
            src={FavoritesIcon}
            alt="Улюблені товари"
            className={styles.menu__favoritesIcon}
          />
          <span className={styles.menu__cartBadge}>
            {favoritesProduct.length}
          </span>
        </Link>
        <Link
          to="/cart"
          className={styles.menu__cart}
          onClick={() => setIsOpenSide(false)}
        >
          <img src={CartIcon} alt="Кошик" className={styles.menu__cartIcon} />
          <span className={styles.menu__cartBadge}>{totalItems}</span>
        </Link>
      </div>
    </aside>
  );
};
