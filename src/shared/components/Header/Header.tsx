import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useTheme } from '../../hooks/useTheme';
import { useFavorites } from '../../hooks/useFavorites';
import { useCart } from '../../../modules/CartPage/CartContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { totalCount } = useCart();

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navLink, {
      [styles.active]: isActive,
    });

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navLink, styles.iconButton, {
      [styles.active]: isActive,
    });

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          <img
            src="./icons/logoLightTheme.svg"
            alt="Phone Catalog logo"
            className={classNames(styles.logoImg, styles.lightLogo)}
          />
          <img
            src="./icons/logoDarkTheme.svg"
            alt="Phone Catalog logo"
            className={classNames(styles.logoImg, styles.darkLogo)}
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink to="/" className={getNavClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/phones" className={getNavClass}>
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablets" className={getNavClass}>
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink to="/accessories" className={getNavClass}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.rightSection}>
        <button
          type="button"
          onClick={toggleTheme}
          className={classNames(styles.navLink, styles.iconButton)}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <span className={styles.moonIcon} aria-label="Dark theme" />
          ) : (
            <span className={styles.sunIcon} aria-label="Light theme" />
          )}
        </button>

        <button
          className={styles.burgerButton}
          onClick={() => setIsMenuOpen(true)}
        >
          <span className={styles.menuIcon} aria-label="Menu" />
        </button>

        <NavLink
          to="/favorites"
          className={navData =>
            classNames(getIconClass(navData), styles.desktopOnly)
          }
          aria-label="Favorites"
        >
          <div className={styles.iconWrapper}>
            <span className={styles.favoritesIcon} aria-label="Favorites" />
            {favorites.length > 0 && (
              <span className={styles.badge} aria-label="Favorites badge">
                {favorites.length}
              </span>
            )}
          </div>
        </NavLink>

        <NavLink
          to="/cart"
          className={navData =>
            classNames(getIconClass(navData), styles.desktopOnly)
          }
          aria-label="Shopping cart"
        >
          <div className={styles.iconWrapper}>
            <span className={styles.cartIcon} aria-label="Cart" />
            {totalCount > 0 && (
              <span className={styles.badge} aria-label="Cart badge">
                {totalCount}
              </span>
            )}
          </div>
        </NavLink>

        <aside
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.isOpen : ''}`}
        >
          <div className={styles.mobileTopBar}>
            <Link to="/" className={styles.logo} onClick={closeMenu}>
              <img
                src="./icons/logoLightTheme.svg"
                alt="Phone Catalog logo"
                className={classNames(styles.logoImg, styles.lightLogo)}
              />
              <img
                src="./icons/logoDarkTheme.svg"
                alt="Phone Catalog logo"
                className={classNames(styles.logoImg, styles.darkLogo)}
              />
            </Link>
            <button className={styles.closeButton} onClick={closeMenu}>
              <span className={styles.closeIcon} aria-label="Close" />
            </button>
          </div>

          <nav className={styles.mobileLinks}>
            <NavLink to="/" onClick={closeMenu} className={getNavClass}>
              Home
            </NavLink>
            <NavLink to="/phones" onClick={closeMenu} className={getNavClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" onClick={closeMenu} className={getNavClass}>
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              onClick={closeMenu}
              className={getNavClass}
            >
              Accessories
            </NavLink>
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favorites"
              onClick={closeMenu}
              className={({ isActive }) =>
                classNames(styles.mobileActionButton, {
                  [styles.activeAction]: isActive,
                })
              }
            >
              <div className={styles.iconWrapper}>
                <span className={styles.favoritesIcon} aria-label="Favorites" />
                {favorites.length > 0 && (
                  <span className={styles.badge} aria-label="Favorites badge">
                    {favorites.length}
                  </span>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) =>
                classNames(styles.mobileActionButton, {
                  [styles.activeAction]: isActive,
                })
              }
            >
              <div className={styles.iconWrapper}>
                <span className={styles.cartIcon} aria-label="Cart" />
                {totalCount > 0 && (
                  <span className={styles.badge} aria-label="Cart badge">
                    {totalCount}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </aside>
      </div>
    </header>
  );
};
