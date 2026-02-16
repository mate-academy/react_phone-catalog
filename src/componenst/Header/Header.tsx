import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { favourites } = useFavourites();

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Link to="/" className={styles.header__logo}>
          <img src="/icons/Logo.svg" alt="Gadget Catalog" />
        </Link>
        <div className={`container ${styles.header__inner}`}>
          <nav className={styles.header__nav}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Home
            </NavLink>
            <NavLink
              to="/products/phones"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Phones
            </NavLink>
            <NavLink
              to="/products/tablets"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/products/accessories"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Accessories
            </NavLink>
          </nav>
        </div>
        <div className={styles.header__actions}>
          <Link to="/favourites" className={styles.header__action}>
            <img src="/icons/Favourites (Heart Like).svg" alt="Favourites" />
            {favourites.length > 0 && (
              <span className={styles.header__badge}>{favourites.length}</span>
            )}
          </Link>
          <Link to="/cart" className={styles.header__action}>
            <img src="/icons/Shopping bag (Cart).svg" alt="Cart" />
            {cart.length > 0 && (
              <span className={styles.header__badge}>{cart.length}</span>
            )}
          </Link>
        </div>
        <button className={styles.header__burger} aria-label="Open menu">
          <img src="/icons/Menu.svg" alt="Menu" />
        </button>
      </div>
    </header>
  );
};

export default Header;
