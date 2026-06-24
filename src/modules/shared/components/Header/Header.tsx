import { type ChangeEvent, useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { useDebounce } from '../../hooks/useDebounce';
import { useCart, useFavorites } from '../../context';
import styles from './Header.module.scss';

type NavLinkState = { isActive: boolean };

const NAV_LINKS = [
  { path: '/', label: 'Home', end: true },
  { path: '/phones', label: 'Phones', end: false },
  { path: '/tablets', label: 'Tablets', end: false },
  { path: '/accessories', label: 'Accessories', end: false },
];

const SEARCH_ROUTES = ['/phones', '/tablets', '/accessories', '/favorites'];

const SEARCH_PLACEHOLDER: Record<string, string> = {
  '/phones': 'Search in Phones...',
  '/tablets': 'Search in Tablets...',
  '/accessories': 'Search in Accessories...',
  '/favorites': 'Search in Favorites...',
};

const getNavClass = ({ isActive }: NavLinkState) =>
  cn(styles.navLink, { [styles.navLinkActive]: isActive });

const getIconClass = ({ isActive }: NavLinkState) =>
  cn(styles.iconLink, { [styles.iconLinkActive]: isActive });

const HEART_PATH =
  'M8 13c-.24 0-.47-.09-.65-.25C5.48 11.13 2 8.09 2 5.25 ' +
  '2 3.46 3.4 2 5.12 2 6.16 2 7.13 2.53 7.7 3.39L8 3.84l.3-.45' +
  'C8.87 2.53 9.84 2 10.88 2 12.6 2 14 3.46 14 5.25c0 2.84-3.48 ' +
  '5.88-5.35 7.5-.18.16-.41.25-.65.25z';

const CART_HANDLE_PATH = 'M5 6V4.5a3 3 0 1 1 6 0V6';
const CART_BODY_PATH = 'M3 6h10l-.75 8H3.75L3 6z';

const SEARCH_PATH =
  'M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06' +
  '.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 ' +
  '1 0 0 0-.115-.099zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0';

const HAMBURGER_PATH = 'M1 3h14M1 8h14M1 13h14';
const CLOSE_PATH = 'M2 2l12 12M14 2L2 14';

const getMobileNavClass = ({ isActive }: NavLinkState) =>
  cn(styles.mobileNavLink, { [styles.mobileNavLinkActive]: isActive });

const getMobileIconClass = ({ isActive }: NavLinkState) =>
  cn(styles.mobileIconLink, { [styles.mobileIconLinkActive]: isActive });

export const Header = () => {
  const { favoritesCount } = useFavorites();
  const { getTotalQuantity } = useCart();
  const cartCount = getTotalQuantity();

  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const showSearch = SEARCH_ROUTES.includes(pathname);
  const placeholder = SEARCH_PLACEHOLDER[pathname] ?? 'Search...';

  const urlQuery = searchParams.get('query') ?? '';
  const [inputValue, setInputValue] = useState(urlQuery);
  const debouncedValue = useDebounce(inputValue, 300);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    setInputValue(searchParams.get('query') ?? '');
    setIsMenuOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!showSearch) {
      return;
    }

    setSearchParams(
      prev => {
        const next = new URLSearchParams(prev);

        if (debouncedValue) {
          next.set('query', debouncedValue);
        } else {
          next.delete('query');
        }

        return next;
      },
      { replace: true },
    );
  }, [debouncedValue, setSearchParams, showSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => setInputValue('');

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.logo} aria-label="Go to home page">
            <span className={styles.logoText}>
              Nice <span className={styles.logoOk}>👌</span>
              <br />
              Gadgets
            </span>
          </NavLink>

          <nav className={styles.nav}>
            {NAV_LINKS.map(({ path, label, end }) => (
              <NavLink key={path} to={path} end={end} className={getNavClass}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.actions}>
          {showSearch && (
            <div className={styles.search}>
              <svg
                className={styles.searchIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d={SEARCH_PATH} fill="currentColor" />
              </svg>

              <input
                type="search"
                className={styles.searchInput}
                value={inputValue}
                onChange={handleChange}
                placeholder={placeholder}
                aria-label="Search products"
              />

              {inputValue && (
                <button
                  type="button"
                  className={styles.searchClear}
                  onClick={handleClear}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          <NavLink
            to="/favorites"
            className={getIconClass}
            aria-label="Favorites"
          >
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={HEART_PATH}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>

          <NavLink to="/cart" className={getIconClass} aria-label="Cart">
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={CART_HANDLE_PATH}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={CART_BODY_PATH}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
        </div>

        <button
          type="button"
          className={styles.hamburger}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={isMenuOpen ? CLOSE_PATH : HAMBURGER_PATH}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {NAV_LINKS.map(({ path, label, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                className={getMobileNavClass}
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favorites"
              className={getMobileIconClass}
              aria-label="Favorites"
              onClick={closeMenu}
            >
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d={HEART_PATH}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>

            <NavLink
              to="/cart"
              className={getMobileIconClass}
              aria-label="Cart"
              onClick={closeMenu}
            >
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d={CART_HANDLE_PATH}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={CART_BODY_PATH}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
