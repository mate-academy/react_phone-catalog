import React, { useState, useEffect } from 'react';
import styles from './ComponentHeader.module.scss';
import { ComponentLogo } from '../Logo';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

export const ComponentHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: favorites } = useFavorites();
  const { state: cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/phones', label: 'Phones' },
    { path: '/tablets', label: 'Tablets' },
    { path: '/accessories', label: 'Accessories' },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const totalQuantity = cart.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <ComponentLogo imgSrc="./img/Logo.png" />

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {['/', '/phones', '/tablets', '/accessories'].map((path, index) => (
              <li className={styles.nav__item} key={path}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.nav__link} ${styles.nav__link__active}`
                      : styles.nav__link
                  }
                  to={path}
                >
                  {['Home', 'Phones', 'Tablets', 'Accessories'][index]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.header__right}>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li
              className={`${styles.icon} ${styles.menu}`}
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <button className={styles.icon__menu}></button>
            </li>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? `${styles.icon} ${styles.icon__active}` : styles.icon
              }
            >
              <div className={styles.icon__wrapper}>
                <img src="./icons/heart.png" alt="Favorites" />
                {favorites.items.length > 0 && (
                  <span className={`${styles.icon__badge} icon`}>
                    {favorites.items.length}
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? `${styles.icon} ${styles.icon__active}` : styles.icon
              }
            >
              <div className={styles.icon__wrapper}>
                <img src="./icons/cart.png" alt="Cart" />
                {cart.items.length > 0 && (
                  <span className={`${styles.icon__badge} icon`}>
                    {totalQuantity}
                  </span>
                )}
              </div>
            </NavLink>
          </ul>
        </nav>
      </div>

      <aside
        className={`${styles.aside} ${isMenuOpen ? styles.aside__open : ''}`}
      >
        <div className={styles.aside__top}>
          <div className={styles.aside__header}>
            <ComponentLogo imgSrc="./img/Logo-black.png" />
            <li
              className={styles.icon}
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <button className={styles.icon__close}></button>
            </li>
          </div>
          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              {navLinks.map(({ path, label }) => (
                <li
                  key={path}
                  className={styles.nav__item}
                  onClick={toggleMenu}
                >
                  <NavLink className={styles.nav__link} to={path}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.aside__bottom}>
          <NavLink
            className={`${styles.icon} ${styles.icon__favorite}`}
            onClick={toggleMenu}
            to="/favorites"
          />

          <NavLink
            className={`${styles.icon} ${styles.icon__cart}`}
            onClick={toggleMenu}
            to="/cart"
          />
        </div>
      </aside>

      {isMenuOpen && (
        <div className={styles.menuOverlay} onClick={toggleMenu}></div>
      )}
    </header>
  );
};
