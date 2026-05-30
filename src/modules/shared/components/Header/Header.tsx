import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../../../../contexts/CartContext';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import styles from './Header.module.scss';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <Link
    to="/"
    className={classNames(styles.logo, className)}
    aria-label="Nice Gadgets home"
  >
    <span className={styles.logoText}>
      {'NICE🔥'}
      <br />
      {'GADGETS'}
    </span>
  </Link>
);

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Logo />

          <nav className={styles.nav}>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  classNames(styles.navLink, {
                    [styles.navLinkActive]: isActive,
                  })
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                classNames(styles.actionBtn, styles.actionBtnDesktop, {
                  [styles.actionBtnActive]: isActive,
                })
              }
              aria-label="Favorites"
            >
              <i className="fa-regular fa-heart" />
              {totalFavorites > 0 && (
                <span className={styles.badge}>{totalFavorites}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                classNames(styles.actionBtn, styles.actionBtnDesktop, {
                  [styles.actionBtnActive]: isActive,
                })
              }
              aria-label="Cart"
            >
              <i className="fa-solid fa-bag-shopping" />
              {totalItems > 0 && (
                <span className={styles.badge}>{totalItems}</span>
              )}
            </NavLink>

            <button
              className={classNames(styles.actionBtn, styles.burgerBtn)}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuTop}>
            <Logo className={styles.mobileMenuLogo} />
            <button
              className={styles.closeBtn}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  classNames(styles.mobileNavLink, {
                    [styles.mobileNavLinkActive]: isActive,
                  })
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.mobileMenuBottom}>
            <NavLink
              to="/favorites"
              onClick={closeMenu}
              className={({ isActive }) =>
                classNames(styles.mobileActionBtn, {
                  [styles.mobileActionBtnActive]: isActive,
                })
              }
              aria-label="Favorites"
            >
              <i className="fa-regular fa-heart" />
              {totalFavorites > 0 && (
                <span className={styles.badge}>{totalFavorites}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) =>
                classNames(styles.mobileActionBtn, {
                  [styles.mobileActionBtnActive]: isActive,
                })
              }
              aria-label="Cart"
            >
              <i className="fa-solid fa-bag-shopping" />
              {totalItems > 0 && (
                <span className={styles.badge}>{totalItems}</span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
