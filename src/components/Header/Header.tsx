import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

import styles from './Header.module.scss';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  const query = searchParams.get('query') || '';
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query, pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if ((searchParams.get('query') || '') !== localQuery) {
        const nextParams = new URLSearchParams(searchParams);

        if (localQuery.trim()) {
          nextParams.set('query', localQuery);
        } else {
          nextParams.delete('query');
        }

        nextParams.delete('page');
        setSearchParams(nextParams);
      }
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [localQuery, searchParams, setSearchParams]);

  const showSearch = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites',
  ].includes(pathname);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete('query');
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  return (
    <header className={styles.header} data-testid="header">
      <Link to="/" className={styles.logoRow} aria-label="Phone Catalog Home">
        <i className="fa-solid fa-mobile-screen-button" />
        <span>GADGETS</span>
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          Accessories
        </NavLink>
      </nav>

      <div className={styles.actions}>
        {showSearch && (
          <div className={styles.searchContainer}>
            <input
              type="search"
              value={localQuery}
              onChange={handleSearchChange}
              placeholder={`Search in ${pathname.slice(1)}...`}
              className={styles.searchInput}
              aria-label="Search items"
            />
            <i
              className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}
            />
            {localQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className={styles.clearButton}
                aria-label="Clear search query"
              >
                <i className="fa-solid fa-circle-xmark" />
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={toggleTheme}
          className={styles.themeBtn}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? (
            <i className="fa-solid fa-moon" />
          ) : (
            <i className="fa-solid fa-sun" />
          )}
        </button>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.iconLink} ${isActive ? styles.iconLinkActive : ''}`
          }
          aria-label="Favorites page"
        >
          <i className="fa-regular fa-heart" />
          {favorites.length > 0 && (
            <span className={styles.badge}>{favorites.length}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.iconLink} ${isActive ? styles.iconLinkActive : ''}`
          }
          aria-label="Cart page"
        >
          <i className="fa-solid fa-bag-shopping" />
          {totalQuantity > 0 && (
            <span className={styles.badge}>{totalQuantity}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
