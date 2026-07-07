import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

const logoSrc = `${import.meta.env.BASE_URL}img/logo.svg`;

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

const getMobileNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? `${styles.navLink} ${styles.mobileNavLink} ${styles.navLinkActive}`
    : `${styles.navLink} ${styles.mobileNavLink}`;

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d={[
        'M8 14s-6-3.6-6-8.2A3.4 3.4 0 0 1 8 3.7',
        'a3.4 3.4 0 0 1 6 2.1C14 10.4 8 14 8 14Z',
      ].join(' ')}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M4 5h8l-.7 8H4.7L4 5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M6 5a2 2 0 1 1 4 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M3 5h10M3 8h10M3 11h10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M4 4l8 8M12 4l-8 8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(currentValue => !currentValue);
  };

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoSrc} alt="Nice Gadgets" className={styles.logo} />
        </Link>

        <nav className={styles.nav}>
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} className={getNavLinkClassName}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={styles.actionLink}
            aria-label="Favorites"
          >
            <HeartIcon />
          </NavLink>

          <NavLink to="/cart" className={styles.actionLink} aria-label="Cart">
            <CartIcon />
          </NavLink>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navItems.map(({ to, label }) => (
              <NavLink key={to} to={to} className={getMobileNavLinkClassName}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileActionLink} ${styles.mobileActionLinkActive}`
                  : styles.mobileActionLink
              }
              aria-label="Favorites"
            >
              <HeartIcon />
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileActionLink} ${styles.mobileActionLinkActive}`
                  : styles.mobileActionLink
              }
              aria-label="Cart"
            >
              <CartIcon />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
