import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import MenuIcon from '/icons/burger_menu.svg';
import CartIcon from '/icons/cart.svg';
import CloseIcon from '/icons/close.svg';
import FavouritesIcon from '/icons/favourites.svg';
import NiceGadgetsLogo from '/icons/nice_gadgets_logo.svg';
import NiceGadgetsLogoLight from '/icons/nice_gadgets_logo_light.svg';
import clsx from 'clsx';
import { useCartActionsStore } from '../../../hooks/useCartAndFavorites';
import { useThemeStore } from '../../../store/themeStore';
import { useMediaQuery } from 'react-responsive';

export const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useThemeStore();

  const isMobileView = useMediaQuery({ maxWidth: 639 });

  const { cartValues, favoritesValues, loadFromStorage } =
    useCartActionsStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const cartTotalQuantity = Object.values(cartValues).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
  const favoritesTotalQuantity = favoritesValues.length;

  useEffect(() => {
    if (!isMobileView && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileView, isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add(styles['no-scroll']);
    } else {
      document.body.classList.remove(styles['no-scroll']);
    }

    return () => {
      document.body.classList.remove(styles['no-scroll']);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const currentLogoPath =
    theme === 'dark' ? NiceGadgetsLogo : NiceGadgetsLogoLight;

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <NavLink
          to="/"
          className={styles.logoLink}
        >
          <img
            src={currentLogoPath}
            alt="Nice Gadgets Logo"
            className={styles.logo}
          />
        </NavLink>

        {!isMobileView && (
          <nav className={styles.navbarNav}>
            <ul className={styles.navList}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                  }
                >
                  <span className={styles.navLinkText}>HOME</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                  }
                >
                  <span className={styles.navLinkText}>PHONES</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                  }
                >
                  <span className={styles.navLinkText}>TABLETS</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                  }
                >
                  <span className={styles.navLinkText}>ACCESSORIES</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
        {!isMobileView && (
          <div className={styles.headerActions}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive ?
                  `${styles.actionBlock} ${styles.favouriteBlock} ${styles.activeActionBlock}`
                : `${styles.actionBlock} ${styles.favouriteBlock}`
              }
            >
              <div className={styles.iconWrapper}>
                <img
                  src={FavouritesIcon}
                  alt="Favourites"
                  className={clsx(styles.icon, 'app-icon')}
                />
                {favoritesTotalQuantity > 0 && (
                  <span className={styles.badge}>{favoritesTotalQuantity}</span>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ?
                  `${styles.actionBlock} ${styles.cartBlock} ${styles.activeActionBlock}`
                : `${styles.actionBlock} ${styles.cartBlock}`
              }
            >
              <div className={styles.iconWrapper}>
                <img
                  src={CartIcon}
                  alt="Cart"
                  className={clsx(styles.icon, 'app-icon')}
                />
                {cartTotalQuantity > 0 && (
                  <span className={styles.badge}>{cartTotalQuantity}</span>
                )}
              </div>
            </NavLink>
          </div>
        )}

        {isMobileView && !isMobileMenuOpen && (
          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
          >
            <img
              src={MenuIcon}
              alt="Open Menu"
              className={clsx(styles.menuIcon, 'app-icon')}
            />
          </button>
        )}
      </div>

      {isMobileMenuOpen && isMobileView && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <NavLink
              to="/"
              className={styles.mobileLogoLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={currentLogoPath}
                alt="Nice Gadgets Logo"
                className={styles.mobileLogo}
              />
            </NavLink>
            <button
              className={styles.mobileMenuClose}
              onClick={toggleMobileMenu}
            >
              <img
                src={CloseIcon}
                alt="Close Menu"
                className={clsx(styles.mobileMenuCloseIcon, 'app-icon')}
              />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.mobileNavLink} ${styles.activeMobileNavLink}`
                    : styles.mobileNavLink
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.navLinkText}>HOME</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.mobileNavLink} ${styles.activeMobileNavLink}`
                    : styles.mobileNavLink
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.navLinkText}>PHONES</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.mobileNavLink} ${styles.activeMobileNavLink}`
                    : styles.mobileNavLink
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.navLinkText}>TABLETS</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    isActive ?
                      `${styles.mobileNavLink} ${styles.activeMobileNavLink}`
                    : styles.mobileNavLink
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.navLinkText}>ACCESSORIES</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive ?
                  `${styles.mobileActionIconLink} ${styles.activeMobileActionIconLink}`
                : styles.mobileActionIconLink
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className={styles.mobileIconWrapper}>
                <img
                  src={FavouritesIcon}
                  alt="Favourites"
                  className={clsx(styles.mobileActionIcon, 'app-icon')}
                />
                {favoritesTotalQuantity > 0 && (
                  <span className={styles.badge}>{favoritesTotalQuantity}</span>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ?
                  `${styles.mobileActionIconLink} ${styles.activeMobileActionIconLink}`
                : styles.mobileActionIconLink
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className={styles.mobileIconWrapper}>
                <img
                  src={CartIcon}
                  alt="Cart"
                  className={clsx(styles.mobileActionIcon, 'app-icon')}
                />
                {cartTotalQuantity > 0 && (
                  <span className={styles.badge}>{cartTotalQuantity}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
