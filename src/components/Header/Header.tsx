import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useStore } from '../../context/StoreContext';

import styles from './Header.module.scss';

const logoSrc = (logoName: string) =>
  `${import.meta.env.BASE_URL}img/logo/${logoName}`;

const iconSrc = (iconName: string) =>
  `${import.meta.env.BASE_URL}img/icons/${iconName}`;

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

export const Header = () => {
  const { cartCount, favorites } = useStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(currentValue => !currentValue);
  };

  const displayedCartCount = cartCount > 99 ? '99+' : cartCount;
  const displayedFavoritesCount =
    favorites.length > 99 ? '99+' : favorites.length;

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink} aria-label="Nice Gadgets home">
          <span className={styles.logo}>
            <img
              src={logoSrc('logo-ng.svg')}
              alt=""
              className={styles.logoNg}
            />

            <img
              src={logoSrc('logo-ok.svg')}
              alt=""
              className={styles.logoOk}
            />
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
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
            aria-label={`Favorites, ${favorites.length} items`}
          >
            <img
              src={iconSrc('heart.svg')}
              alt=""
              className={styles.actionIcon}
            />

            {favorites.length > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {displayedFavoritesCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={styles.actionLink}
            aria-label={`Cart, ${cartCount} items`}
          >
            <img
              src={iconSrc('cart.svg')}
              alt=""
              className={styles.actionIcon}
            />

            {cartCount > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {displayedCartCount}
              </span>
            )}
          </NavLink>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <img
            src={iconSrc(isMenuOpen ? 'close.svg' : 'menu.svg')}
            alt=""
            className={styles.menuIcon}
          />
        </button>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
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
              aria-label={`Favorites, ${favorites.length} items`}
            >
              <img
                src={iconSrc('heart.svg')}
                alt=""
                className={styles.mobileActionIcon}
              />

              {favorites.length > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {displayedFavoritesCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileActionLink} ${styles.mobileActionLinkActive}`
                  : styles.mobileActionLink
              }
              aria-label={`Cart, ${cartCount} items`}
            >
              <img
                src={iconSrc('cart.svg')}
                alt=""
                className={styles.mobileActionIcon}
              />

              {cartCount > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {displayedCartCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
