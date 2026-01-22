import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFav } from '../../context/FavContext';

export const Header = () => {
  const { cartItems } = useCart();
  const { favItems } = useFav();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ta funkcja służy tylko do linków tekstowych (Home, Phones...)
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, {
      [styles.isActive]: isActive,
    });

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      {/* LOGO */}
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        <img src="/img/logo.svg" alt="Nice Gadgets" />
      </Link>

      <div className={styles.content}>
        {/* DESKTOP NAV */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink to="/" end className={getLinkClass}>
                Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/phones" className={getLinkClass}>
                Phones
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/tablets" className={getLinkClass}>
                Tablets
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/accessories" className={getLinkClass}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* DESKTOP ICONS */}
        <div className={styles.icons}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              cn(styles.iconLink, { [styles.isActive]: isActive })
            }
          >
            <div className={styles.iconWrapper}>
              <img src="/img/icons/Heart.svg" alt="Favourites" />
              {favItems.length > 0 && (
                <span className={styles.badge}>{favItems.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles.iconLink, { [styles.isActive]: isActive })
            }
          >
            <div className={styles.iconWrapper}>
              <img src="/img/icons/cart.svg" alt="Cart" />
              {cartItems.length > 0 && (
                <span className={styles.badge}>{cartItems.length}</span>
              )}
            </div>
          </NavLink>
        </div>

        {/* BURGER BUTTON */}
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            src={isMenuOpen ? '/img/icons/close.svg' : '/img/icons/menu.svg'}
            alt="Menu"
          />
        </button>
      </div>

      {/* 👇 MENU MOBILNE */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {/* Linki tekstowe */}
          <nav className={styles.mobileNav}>
            <NavLink to="/" end className={getLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass} onClick={closeMenu}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass} onClick={closeMenu}>
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={getLinkClass}
              onClick={closeMenu}
            >
              Accessories
            </NavLink>
          </nav>

          {/* 👇 ZMIANA TUTAJ: Ikony na dole (bez tekstu, nowa klasa) */}
          <div className={styles.mobileIcons}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                cn(styles.mobileIconLink, { [styles.isActive]: isActive })
              }
              onClick={closeMenu}
            >
              <div className={styles.iconWrapper}>
                <img src="/img/icons/Heart.svg" alt="Favourites" />
                {favItems.length > 0 && (
                  <span className={styles.badge}>{favItems.length}</span>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(styles.mobileIconLink, { [styles.isActive]: isActive })
              }
              onClick={closeMenu}
            >
              <div className={styles.iconWrapper}>
                <img src="/img/icons/cart.svg" alt="Cart" />
                {cartItems.length > 0 && (
                  <span className={styles.badge}>{cartItems.length}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
