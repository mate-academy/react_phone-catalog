import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { getPublicUrl } from '../../utils/getPublicUrl';
import { SearchField } from '../SearchField';

export const Header = () => {
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchAreaRef = useRef<HTMLDivElement>(null);

  const showSearch = [
    '/',
    '/search',
    '/phones',
    '/tablets',
    '/accessories',
  ].includes(pathname);

  useEffect(() => {
    if (pathname !== '/search') {
      setIsSearchOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (!searchAreaRef.current?.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('pointerdown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen]);

  const favoritesCount = favorites.length;
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const closeMenu = () => setIsMenuOpen(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, {
      [styles.active]: isActive,
    });

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <img
          className={styles.logo}
          src={getPublicUrl('/img/logo/logo.svg')}
          alt="Nice Gadgets"
        />
      </div>

      <nav className={styles.nav}>
        <NavLink to="/" className={getLinkClass}>
          HOME
        </NavLink>
        <NavLink to="/phones" className={getLinkClass}>
          PHONES
        </NavLink>
        <NavLink to="/tablets" className={getLinkClass}>
          TABLETS
        </NavLink>
        <NavLink to="/accessories" className={getLinkClass}>
          ACCESSORIES
        </NavLink>
      </nav>

      {showSearch && (
        <div ref={searchAreaRef} className={styles.searchArea}>
          <button
            type="button"
            className={styles.searchButton}
            onClick={() => {
              setIsSearchOpen(prev => !prev);
              setIsMenuOpen(false);
            }}
            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
            aria-expanded={isSearchOpen}
            aria-controls={isSearchOpen ? 'header-product-search' : undefined}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 5 5" />
            </svg>
          </button>

          {isSearchOpen && (
            <div id="header-product-search" className={styles.searchPanel}>
              <SearchField />
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        className={cn(styles.themeButton, styles.mobileThemeButton)}
        onClick={toggleTheme}
        aria-label={
          theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        }
        title={theme === 'light' ? 'Dark mode' : 'Light mode'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div
        className={cn(styles.actions, {
          [styles.actionsWithSearch]: showSearch,
        })}
      >
        <button
          type="button"
          className={styles.themeButton}
          onClick={toggleTheme}
          aria-label={
            theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
          }
          title={theme === 'light' ? 'Dark mode' : 'Light mode'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            cn(styles.actionLink, {
              [styles.actionActive]: isActive,
            })
          }
          aria-label="Favorites"
        >
          <img
            className={styles.actionIcon}
            src={getPublicUrl(
              theme === 'dark'
                ? '/img/icon/heart-dark.svg'
                : '/img/icon/heart.svg',
            )}
            alt=""
          />
          {favoritesCount > 0 && (
            <span className={styles.cartCount}>{favoritesCount}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            cn(styles.actionLink, {
              [styles.actionActive]: isActive,
            })
          }
          aria-label="Cart"
        >
          <img
            className={styles.actionIcon}
            src={getPublicUrl(
              theme === 'dark'
                ? '/img/icon/cart-dark.svg'
                : '/img/icon/cart.svg',
            )}
            alt=""
          />
          {cartCount > 0 && (
            <span className={styles.cartCount}>{cartCount}</span>
          )}
        </NavLink>
      </div>

      <button
        type="button"
        className={styles.menuButton}
        onClick={() => {
          setIsMenuOpen(prev => !prev);
          setIsSearchOpen(false);
        }}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
      >
        {isMenuOpen ? (
          <span className={styles.closeIcon} aria-hidden="true">
            ×
          </span>
        ) : (
          <span className={styles.burgerIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        )}
      </button>

      {isMenuOpen && (
        <div id="mobile-navigation" className={styles.mobileMenu}>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <NavLink to="/" className={getLinkClass} onClick={closeMenu}>
              HOME
            </NavLink>

            <NavLink to="/phones" className={getLinkClass} onClick={closeMenu}>
              PHONES
            </NavLink>

            <NavLink to="/tablets" className={getLinkClass} onClick={closeMenu}>
              TABLETS
            </NavLink>

            <NavLink
              to="/accessories"
              className={getLinkClass}
              onClick={closeMenu}
            >
              ACCESSORIES
            </NavLink>
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favorites"
              onClick={closeMenu}
              className={({ isActive }) =>
                cn(styles.mobileActionLink, {
                  [styles.mobileActionActive]: isActive,
                })
              }
              aria-label="Favorites"
            >
              <img
                src={getPublicUrl(
                  theme === 'dark'
                    ? '/img/icon/heart-dark.svg'
                    : '/img/icon/heart.svg',
                )}
                alt=""
              />

              {favoritesCount > 0 && (
                <span className={styles.cartCount}>{favoritesCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) =>
                cn(styles.mobileActionLink, {
                  [styles.mobileActionActive]: isActive,
                })
              }
              aria-label="Cart"
            >
              <img
                src={getPublicUrl(
                  theme === 'dark'
                    ? '/img/icon/cart-dark.svg'
                    : '/img/icon/cart.svg',
                )}
                alt=""
              />

              {cartCount > 0 && (
                <span className={styles.cartCount}>{cartCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
