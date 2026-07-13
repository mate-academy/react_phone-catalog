import { NavLink, Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { BurgerMenu } from '../Burgermenu';
import React, { useState } from 'react';
import { Search } from '../Search';

export const Header: React.FC = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalFavourites = favorites.length;

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.header__link} ${styles['header__link--active']}`
      : styles.header__link;

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles['header__icon-item']} ${styles['header__icon-item--active']} ${styles['header__hide-on-mobile']}`
      : `${styles['header__icon-item']} ${styles['header__hide-on-mobile']}`;

  const location = useLocation();

  const showSearch = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites',
  ].includes(location.pathname);

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header__left-section']}>
          <div className={styles.header__logo}>
            <Link to="/">
              <img src={`${import.meta.env.BASE_URL}/img/Logo.svg`} alt="Nice Gadgets Logo" />
            </Link>
          </div>

          <nav className={styles.header__nav}>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.header__icons}>
          {showSearch && <Search />}

          <NavLink to="/favorites" className={getIconClass}>
            <div className={styles['header__icon-wrapper']}>
              <img src={`${import.meta.env.BASE_URL}/img/icons/heart.svg`} alt="Favourites" />
              {totalFavourites > 0 && (
                <span className={styles.header__badge}>{totalFavourites}</span>
              )}
            </div>
          </NavLink>

          <NavLink to="/cart" className={getIconClass}>
            <div className={styles['header__icon-wrapper']}>
              <img src={`${import.meta.env.BASE_URL}img/icons/busket.svg`} alt="Cart" />
              {totalItems > 0 && (
                <span className={styles.header__badge}>{totalItems}</span>
              )}
            </div>
          </NavLink>

          <button
            onClick={() => setIsMenuOpen(true)}
            className={`${styles['header__icon-item']} ${styles['header__hide-on-desktop']}`}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <img src={`${import.meta.env.BASE_URL}img/icons/menu.svg`} alt="Burger menu" />
          </button>
        </div>
      </header>

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
