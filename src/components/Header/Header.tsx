import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';

export const Header: React.FC = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/img/logo.svg`;
  const [isActive, setIsActive] = useState(false);
  const { favoriteItems } = useContext(FavoritesContext);
  const { cartItems } = useContext(CartContext);
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isActive]);

  const cartItem = useMemo(
    () => (cartItems ? cartItems.reduce((acc, item) => acc + item.amount, 0) : 0),
    [cartItems],
  );

  const getNavLinkClass = (active: boolean) => {
    return `${styles.nav__link} ${active ? styles['nav__link--active'] : ''}`;
  };

  return (
    <>
      <header>
      <div className={styles["header--mobile"]}>
          <div className={styles.top}>
            <Link className={styles.logoLink} to="/">
              <img src={logoUrl} alt="" />
            </Link>
            <button onClick={toggleMenu} className={styles.button}>
              <span className={`${styles.icon} ${styles['icon--menu']}`}></span>
            </button>
          </div>
        </div>
        <aside className={`${styles.menu} ${isActive ? styles.active : ''}`}>
          <div className={styles.top}>
            <Link className={styles.logoLink} to="/" onClick={() => setIsActive(false)}>
              <img src={logoUrl} alt="" />
            </Link>
            <button onClick={toggleMenu} className={styles.button}>
              <span className={`${styles.icon} ${styles['icon--close']}`}></span>
            </button>
          </div>
          <nav className={styles.nav}>
            <ul className={styles['nav__list']}>
              <li className={styles['nav__item']} onClick={() => setIsActive(false)}>
                <NavLink to="/" className={({ isActive: active }) => getNavLinkClass(active)}>
                  Home
                </NavLink>
              </li>
              <li className={styles['nav__item']} onClick={() => setIsActive(false)}>
                <NavLink to="/phones" className={({ isActive: active }) => getNavLinkClass(active)}>
                  Phones
                </NavLink>
              </li>
              <li className={styles['nav__item']} onClick={() => setIsActive(false)}>
                <NavLink
                  to="/tablets"
                  className={({ isActive: active }) => getNavLinkClass(active)}
                >
                  Tablets
                </NavLink>
              </li>
              <li className={styles['nav__item']} onClick={() => setIsActive(false)}>
                <NavLink
                  to="/accessories"
                  className={({ isActive: active }) => getNavLinkClass(active)}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles['menu__icons']}>
            <NavLink
              to="/favorites"
              onClick={() => setIsActive(false)}
              className={({ isActive: active }) => getNavLinkClass(active)}
            >
              <span className={`${styles.icon} ${styles['icon--heart']}`}>
                {favoriteItems.length > 0 && (
                  <span className={styles.cartItemsAmount}>{favoriteItems.length}</span>
                )}
              </span>
            </NavLink>
            <NavLink
              to="/cart"
              onClick={() => setIsActive(false)}
              className={({ isActive: active }) => getNavLinkClass(active)}
            >
              <span className={`${styles.icon} ${styles['icon--cart']}`}>
                {cartItem > 0 && <span className={styles.cartItemsAmount}> {cartItem} </span>}
              </span>
            </NavLink>
          </div>
        </aside>
      </header>
    </>
  );
};
