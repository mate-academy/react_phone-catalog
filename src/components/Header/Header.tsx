import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from './icons/Logo.png';
import HeartIcon from './icons/heart-icon.png';
import CartIcon from './icons/cart-icon.png';
import BurgerMenu from './icons/burger-menu-icon.png';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useFavorites } from '../../context/FavoritesContext';

export const Header: React.FC = () => {
  const { cartItems } = useShoppingCart();
  const { favItems } = useFavorites();

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__container__left}>
          <div className={styles.header__logo}>
            <NavLink to="/">
              <img src={Logo} alt="Logo" className={styles.header__logo__img} />
            </NavLink>
          </div>

          <nav className={styles.header__nav}>
            <NavLink to="/" className={styles.header__nav__item}>
              HOME
            </NavLink>

            <NavLink to="/phones" className={styles.header__nav__item}>
              PHONES
            </NavLink>

            <NavLink to="/tablets" className={styles.header__nav__item}>
              TABLETS
            </NavLink>

            <NavLink to="/accessories" className={styles.header__nav__item}>
              ACCESSORIES
            </NavLink>
          </nav>
        </div>

        <div className={styles.header__container__right}>
          <div className={styles.header__icons__icon}>
            <NavLink to="/favorites">
              <div className={styles.header__icons__wrapper}>
                <img
                  src={HeartIcon}
                  alt="Favorites"
                  className={styles.header__icons__img}
                />
                {favItems.length > 0 && (
                  <div className={styles.header__icons__amount}>
                    {favItems.length}
                  </div>
                )}
              </div>
            </NavLink>
          </div>

          <div className={styles.header__icons__icon}>
            <NavLink to="/cart">
              <div className={styles.header__icons__wrapper}>
                <img
                  src={CartIcon}
                  alt="Cart"
                  className={styles.header__icons__img}
                />
                {cartItems.length > 0 && (
                  <div className={styles.header__icons__amount}>
                    {cartItems.length}
                  </div>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
