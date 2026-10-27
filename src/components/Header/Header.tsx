import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import { useShop } from '../../context/ShopContext';

import styles from './Header.module.scss';

const SEARCH_PAGES = ['/phones', '/tablets', '/accessories', '/favorites'];

const SEARCH_DELAY = 300;

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header = () => {
  const { favorites, cartQuantity } = useShop();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const showSearch = SEARCH_PAGES.includes(location.pathname);
  const urlQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(urlQuery);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setQuery(urlQuery);

    if (searchTimer.current !== null) {
      clearTimeout(searchTimer.current);
      searchTimer.current = null;
    }
  }, [urlQuery, location.pathname]);

  useEffect(() => {
    return () => {
      if (searchTimer.current !== null) {
        clearTimeout(searchTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);

    if (searchTimer.current !== null) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
      setSearchParams(
        prev => {
          const params = new URLSearchParams(prev);
          const trimmedQuery = value.trim();

          if (trimmedQuery) {
            params.set('query', trimmedQuery);
          } else {
            params.delete('query');
          }

          params.delete('page');

          return params;
        },
        { replace: true },
      );

      searchTimer.current = null;
    }, SEARCH_DELAY);
  };

  const renderSearch = () => (
    <div className={styles.search}>
      <input
        type="search"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search..."
        aria-label="Search products"
        className={styles.searchInput}
      />
    </div>
  );

  const renderLinks = () =>
    links.map(link => (
      <NavLink
        key={link.to}
        to={link.to}
        end={link.end}
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''}`
        }
        onClick={closeMenu}
      >
        {link.label}
      </NavLink>
    ));

  const renderActions = () => (
    <>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `${styles.action} ${isActive ? styles.actionActive : ''}`
        }
        aria-label="Favorites"
        onClick={closeMenu}
      >
        <img
          src={`${import.meta.env.BASE_URL}img/icons/Favorites.svg`}
          alt=""
        />

        {favorites.length > 0 && (
          <span className={styles.counter}>{favorites.length}</span>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `${styles.action} ${isActive ? styles.actionActive : ''}`
        }
        aria-label="Cart"
        onClick={closeMenu}
      >
        <img src={`${import.meta.env.BASE_URL}img/icons/Cart.svg`} alt="" />

        {cartQuantity > 0 && (
          <span className={styles.counter}>{cartQuantity}</span>
        )}
      </NavLink>
    </>
  );

  return (
    <header className={styles.header}>
      <NavLink
        to="/"
        className={styles.logo}
        onClick={closeMenu}
        aria-label="Nice Gadgets home"
      >
        <img
          src={`${import.meta.env.BASE_URL}img/logo/logo-text.svg`}
          alt="Nice Gadgets"
          className={styles.logoText}
        />

        <img
          src={`${import.meta.env.BASE_URL}img/logo/logo-icon.svg`}
          alt=""
          className={styles.logoIcon}
        />
      </NavLink>

      <nav className={styles.nav} aria-label="Main navigation">
        {renderLinks()}
      </nav>

      <div className={styles.desktopActions}>
        {showSearch && renderSearch()}
        {renderActions()}
      </div>

      <button
        type="button"
        className={`${styles.mobileMenuButton}
        ${isMenuOpen ? styles.menuButtonOpen : ''}`}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen(value => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id="mobile-navigation"
        className={`${styles.mobileMenu}
        ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-controls={isMenuOpen ? 'mobile-navigation' : undefined}
      >
        <div className={styles.mobileMenuContent}>
          {showSearch && renderSearch()}

          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {renderLinks()}
          </nav>
        </div>

        <div className={styles.mobileActions}>{renderActions()}</div>
      </div>
    </header>
  );
};
