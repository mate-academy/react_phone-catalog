import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './Header.module.scss';

const IconHeart = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 14s-6-3.84-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4.16-6 8-6 8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCart = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      // eslint-disable-next-line max-len
      d="M6 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-12-13h2l1.68 8.39a1 1 0 0 0 1 .81h6.72a1 1 0 0 0 1-.81L14 4H4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconMenu = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 4h12M2 8h12M2 12h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 3l10 10M13 3L3 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`;

  const iconCls = ({ isActive }: { isActive: boolean }) =>
    `${styles.iconBtn} ${isActive ? styles.iconBtnActive : ''}`;

  const mobileNavCls = ({ isActive }: { isActive: boolean }) =>
    `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`;

  const mobileIconCls = ({ isActive }: { isActive: boolean }) =>
    `${styles.mobileIconBtn} ${isActive ? styles.mobileIconBtnActive : ''}`;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoNice}>NICE</span>
            <span className={styles.logoDot}>▪</span>
            <span className={styles.logoGadgets}>GADGETS</span>
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/" end className={navCls}>
              Home
            </NavLink>
            <NavLink to="/phones" className={navCls}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={navCls}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={navCls}>
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.right}>
          <NavLink to="/favorites" className={iconCls} aria-label="Favourites">
            <IconHeart />
            {totalFavorites > 0 && (
              <span className={styles.badge}>{totalFavorites}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={iconCls} aria-label="Cart">
            <IconCart />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </NavLink>

          <button
            className={styles.burgerBtn}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu />
          </button>
        </div>
      </header>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileTop}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoNice}>NICE</span>
            <span className={styles.logoDot}>▪</span>
            <span className={styles.logoGadgets}>GADGETS</span>
          </Link>

          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <IconClose />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          <NavLink to="/" end className={mobileNavCls}>
            Home
          </NavLink>
          <NavLink to="/phones" className={mobileNavCls}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={mobileNavCls}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={mobileNavCls}>
            Accessories
          </NavLink>
        </nav>

        <div className={styles.mobileBottom}>
          <NavLink
            to="/favorites"
            className={mobileIconCls}
            aria-label="Favourites"
          >
            <IconHeart />
            {totalFavorites > 0 && (
              <span className={styles.badge}>{totalFavorites}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={mobileIconCls} aria-label="Cart">
            <IconCart />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
};
