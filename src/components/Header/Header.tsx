import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import heartIcon from '../../../public/img/assets/icons/favourites.png';
import cartIcon from '../../../public/img/assets/icons/shopping-cart.png';
import logo from '../../../public/img/logo.png';
import styles from './Header.module.scss';
import menuIcon from '../../../public/img/assets/icons/menu.png';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <NavLink to={'/'}>
            <img src={logo} className={styles.header__logo} alt="Logo" />
          </NavLink>

          <nav className={styles.header__nav}>
            <ul className={styles.header__list}>
              <li className={styles.header__item}>
                <NavLink to={'/'} className={styles.header__link}>
                  Home
                </NavLink>
              </li>
              <li className={styles.header__item}>
                <NavLink to={'/phones'} className={styles.header__link}>
                  Phones
                </NavLink>
              </li>
              <li className={styles.header__item}>
                <NavLink to={'/tablets'} className={styles.header__link}>
                  Tablets
                </NavLink>
              </li>
              <li className={styles.header__item}>
                <NavLink to={'/accessories'} className={styles.header__link}>
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.header__controls}>
            <div className={styles.header__icons}>
              <NavLink to={'/favorites'} className={styles.header__icon}>
                <img src={heartIcon} alt="Favorites" />
              </NavLink>
              <NavLink to={'/cart'} className={styles.header__icon}>
                <img src={cartIcon} alt="Cart" />
              </NavLink>
            </div>

            <button
              className={styles.header__menu}
              onClick={() => setIsMenuOpen(true)}
            >
              <img src={menuIcon} alt="Menu" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
