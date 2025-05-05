import React from 'react';
import { NavLink } from 'react-router-dom';
import heartIcon from '../../../public/img/assets/icons/favourites.png';
import cartIcon from '../../../public/img/assets/icons/shopping-cart.png';
import logo from '../../../public/img/logo.png';
import styles from './Header.module.scss';
import menuIcon from '../../../public/img/assets/icons/menu.png';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <NavLink to={'/'}>
          <img src={logo} className={styles.header__logo} alt="Logo" />
        </NavLink>

        <nav className={styles.header__nav}>
          <NavLink to={'/'} className={styles.header__link}>
            Home
          </NavLink>
          <NavLink to={'/phones'} className={styles.header__link}>
            Phones
          </NavLink>
          <NavLink to={'/tablets'} className={styles.header__link}>
            Tablets
          </NavLink>
          <NavLink to={'/accessories'} className={styles.header__link}>
            Accessories
          </NavLink>
        </nav>

        <div className={styles.header__controls}>
          <div className={styles.header__icons}>
            <NavLink to={'/favorites'}>
              <img src={heartIcon} alt="Favorites" />
            </NavLink>
            <NavLink to={'/cart'}>
              <img src={cartIcon} alt="Cart" />
            </NavLink>
          </div>

          <button className={styles.header__menu}>
            <img src={menuIcon} alt="Menu" />
          </button>
        </div>
      </div>
    </header>
  );
};
