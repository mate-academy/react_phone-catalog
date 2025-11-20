import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './HeaderMobile.module.scss';
import logoImg from '../../../../public/icons/Logo.svg';
import menuIcon from '../../../../public/icons/Menu.svg';
import closeIcon from '../../../../public/icons/Close.svg';
import heartIcon from '../../../../public/icons/Favourites-(Heart-Like).svg';
import bagIcon from '../../../../public/icons/Shopping-bag-(Cart).svg';
import { useCart } from '../../../context/CartContext';

export function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, favourites } = useCart();

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoImg} alt="Nice Gadgets" className={styles.logo} />
        </Link>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <img
            src={isOpen ? closeIcon : menuIcon}
            alt={isOpen ? 'Close' : 'Menu'}
            className={styles.menuIcon}
          />
        </button>
      </div>

      <aside className={`${styles.menuPanel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.topBar}>
          <Link to="/" className={styles.logoLink}>
            <img src={logoImg} alt="Nice Gadgets" className={styles.logo} />
          </Link>

          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <img
              src={isOpen ? closeIcon : menuIcon}
              alt={isOpen ? 'Close' : 'Menu'}
              className={styles.menuIcon}
            />
          </button>
        </div>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>

          <NavLink
            to="/phones"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Phones
          </NavLink>

          <NavLink
            to="/tablets"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Tablets
          </NavLink>

          <NavLink
            to="/accessories"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Accessories
          </NavLink>
        </nav>

        <div className={styles.bottomBar}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.iconButton} ${styles.iconButton__active}`
                : styles.iconButton
            }
            onClick={toggleMenu}
          >
            <div className={styles.iconWrapper}>
              <img src={heartIcon} alt="Favorites" />

              {favourites.length > 0 && (
                <span className={styles.badge}>{favourites.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.iconButton} ${styles.iconButton__active}`
                : styles.iconButton
            }
            onClick={toggleMenu}
          >
            <div className={styles.iconWrapper}>
              <img src={bagIcon} alt="Cart" />

              {cartItems.length > 0 && (
                <span className={styles.badge}>{cartItems.length}</span>
              )}
            </div>
          </NavLink>
        </div>
      </aside>
    </header>
  );
}
