import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import LogoIcon from '../../../assets/icons/header-icons/logo.svg';
import FavoriteIcon from '../../../assets/icons/header-icons/favorites-icon.svg';
import CartIcon from '../../../assets/icons/header-icons/cart-icon.svg';
import HamburgerIcon from '../../../assets/icons/header-icons/hamburger-icon.svg';
import CloseIcon from '../../../assets/icons/header-icons/close-icon.svg';
import { getClassName } from '../../utils/classNameActive';
import { useContext } from 'react';
import { FavoritesStateContext } from '../../store/FavoritesProvider';
import { CartStateContext } from '../../store/CartProvider';

type Props = {
  isOpenSide: boolean;
  setIsOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ isOpenSide, setIsOpenSide }) => {
  const favoritesProduct = useContext(FavoritesStateContext);
  const cartsProduct = useContext(CartStateContext);

  const tottalCartItems =
    Array.isArray(cartsProduct) &&
    cartsProduct.length > 0 &&
    cartsProduct.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logoLink}>
          <img src={LogoIcon} alt="Логотип" className={styles.header__logo} />
        </Link>
        <nav className={styles.header__nav}>
          <ul className={styles.header__list}>
            <li className={styles.header__item}>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return getClassName({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  });
                }}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="phones"
                className={({ isActive }) => {
                  return getClassName({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  });
                }}
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="tablets"
                className={({ isActive }) => {
                  return getClassName({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  });
                }}
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="accessories"
                className={({ isActive }) => {
                  return getClassName({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  });
                }}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.header__wrapper}>
          <NavLink
            to="favorites"
            className={({ isActive }) => {
              return getClassName({
                isActive,
                baseClass: styles.header__favoritesLink,
                activeClass: styles.header__imageLinkActive,
              });
            }}
          >
            <img
              src={FavoriteIcon}
              alt="Відкрити улюблені товари"
              className={styles.header__favoritesImg}
            />
            {favoritesProduct.length > 0 && (
              <span className={styles.header__cart_favorite_number}>
                {favoritesProduct.length}
              </span>
            )}
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) => {
              return getClassName({
                isActive,
                baseClass: styles.header__cartLink,
                activeClass: styles.header__imageLinkActive,
              });
            }}
          >
            <img
              src={CartIcon}
              alt="Відкрити корзину з товарами"
              className={styles.header__cartImg}
            />
            {tottalCartItems && (
              <span className={styles.header__cart_favorite_number}>
                {tottalCartItems}
              </span>
            )}
          </NavLink>

          <button
            className={styles.header__menuBtn}
            onClick={() => setIsOpenSide(prev => !prev)}
          >
            <img
              src={!isOpenSide ? HamburgerIcon : CloseIcon}
              alt={!isOpenSide ? 'Відкрити меню' : 'Закрити меню'}
              className={styles.header__menuImg}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
