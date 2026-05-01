import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppRoutes } from '../../../../utils/routes';
import { useProducts, useCart } from '../../../../context';
import styles from './Header.module.scss';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites } = useProducts();
  const { totalQuantity } = useCart();

  const navLinks = [
    { to: AppRoutes.HOME, label: 'Home' },
    { to: AppRoutes.PHONES, label: 'Phones' },
    { to: AppRoutes.TABLETS, label: 'Tablets' },
    { to: AppRoutes.ACCESSORIES, label: 'Accessories' },
  ];

  return (
    <>
      <header className={styles.header} data-cy="header">
        <div className={styles.container}>
          {/* Logo */}
          <Link
            to={AppRoutes.HOME}
            className={styles.logo}
            aria-label="Go to home"
          >
            <img src="/img/icons/Logo.svg" alt="Nice Gadgets logo" />
          </Link>

          {/* Tablet+ nav links */}
          <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `${styles.navLink}${isActive ? ` ${styles.navLinkActive}` : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side buttons */}
          <div className={styles.actions}>
            {/* Tablet+ icon buttons */}
            <NavLink
              to={AppRoutes.FAVOURITES}
              className={({ isActive }) =>
                `${styles.iconButton}${isActive ? ` ${styles.iconButtonActive}` : ''}`
              }
              aria-label="Favourites"
            >
              <img src="/img/icons/Favourites.svg" alt="Favourites" />
              {favorites.length > 0 && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </NavLink>
            <NavLink
              to={AppRoutes.CART}
              className={({ isActive }) =>
                `${styles.iconButton}${isActive ? ` ${styles.iconButtonActive}` : ''}`
              }
              aria-label="Cart"
            >
              <img src="/img/icons/Cart.svg" alt="Cart" />
              {totalQuantity > 0 && (
                <span className={styles.badge}>{totalQuantity}</span>
              )}
            </NavLink>

            {/* Mobile-only menu button */}
            <button
              className={styles.menuButton}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <img
                src={menuOpen ? '/img/icons/Close.svg' : '/img/icons/Menu.svg'}
                alt={menuOpen ? 'Close' : 'Menu'}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      <nav
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Mobile navigation"
      >
        <ul className={styles.mobileNavList}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${styles.mobileNavLink}${isActive ? ` ${styles.mobileNavLinkActive}` : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.menuBottomActions}>
          <NavLink
            to={AppRoutes.FAVOURITES}
            className={({ isActive }) =>
              `${styles.menuIconButton}${isActive ? ` ${styles.menuIconButtonActive}` : ''}`
            }
            aria-label="Favourites"
            onClick={() => setMenuOpen(false)}
          >
            <img src="/img/icons/Favourites.svg" alt="Favourites" />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </NavLink>
          <NavLink
            to={AppRoutes.CART}
            className={({ isActive }) =>
              `${styles.menuIconButton}${isActive ? ` ${styles.menuIconButtonActive}` : ''}`
            }
            aria-label="Cart"
            onClick={() => setMenuOpen(false)}
          >
            <img src="/img/icons/Cart.svg" alt="Cart" />
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </NavLink>
        </div>
      </nav>
    </>
  );
};
