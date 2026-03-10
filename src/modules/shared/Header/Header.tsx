import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useFavorites } from '../../../context/FavoritesContext';
import { useCart } from '../../../context/CartContext';
import cn from 'classnames';
import { useTheme } from '../../../context/ThemeContext';
import { useDebounce } from '../../../hooks/useDebounce';
import { SearchInput } from '../SearchInput/SearchInput';

export const Header: React.FC = () => {
  const { favoritesCount } = useFavorites();
  const { totalCount } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const location = useLocation();

  const isFavoritesActive = location.pathname === '/favorites';
  const isCartActive = location.pathname === '/cart';

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.linkActive : styles.link;

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.mobileLinkActive : styles.mobileLink;

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const debouncedQuery = useDebounce(query, 300);

  const searchPages = ['/phones', '/tablets', '/accessories', '/favorites'];
  const showSearch = searchPages.includes(location.pathname);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedQuery) {
      params.set('query', debouncedQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }, [debouncedQuery, searchParams, setSearchParams]);

  useEffect(() => {
    setQuery('');
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.logo}>
          <img src="img/logo.svg" alt="Nice Gadgets" />
        </Link>

        {/* Hide on mobile */}
        <nav className={styles.nav}>
          <NavLink to="/" className={getNavLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/phones" className={getNavLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getNavLinkClass}>
            Accessories
          </NavLink>
        </nav>

        {/* Search */}
        {showSearch && (
          <div className={styles.search}>
            <SearchInput
              query={query}
              placeholder={`Search in ${location.pathname.slice(1)}...`}
              onChange={setQuery}
              onClear={() => setQuery('')}
            />
          </div>
        )}

        {/* Hide on mobile */}
        <div className={styles.actions}>
          <button className={styles.iconLink} onClick={toggleTheme}>
            <img
              src={
                theme === 'dark' ? 'img/icons/sun.svg' : 'img/icons/moon.svg'
              }
              alt="Toggle theme"
            />
          </button>
          <Link
            to="/favorites"
            className={cn(styles.iconLink, {
              [styles.active]: isFavoritesActive,
            })}
          >
            <img src="img/icons/heart.svg" alt="Favorites" />
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </Link>
          <Link
            to="/cart"
            className={cn(styles.iconLink, { [styles.active]: isCartActive })}
          >
            <img src="img/icons/cart.svg" alt="Cart" />
            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </Link>
        </div>

        {/* Visible only on mobile */}
        <div className={styles.mobileControls}>
          <button className={styles.iconLink} onClick={toggleTheme}>
            <img
              src={
                theme === 'dark' ? 'img/icons/sun.svg' : 'img/icons/moon.svg'
              }
              alt="Toggle theme"
            />
          </button>

          <button className={styles.burger} onClick={toggleMenu}>
            <img
              src="img/icons/menu.svg"
              className={isMenuOpen ? styles.hidden : ''}
              alt="Menu"
            />
            <img
              src="img/icons/close.svg"
              className={isMenuOpen ? '' : styles.hidden}
              alt="Close"
            />
          </button>
        </div>
      </div>

      {/* Search on mobile */}
      {showSearch && (
        <div className={styles.mobileSearch}>
          <SearchInput
            query={query}
            placeholder={`Search in ${location.pathname.slice(1)}...`}
            onChange={setQuery}
            onClear={() => setQuery('')}
          />
        </div>
      )}

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <NavLink to="/" className={getMobileNavLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/phones" className={getMobileNavLinkClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getMobileNavLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getMobileNavLinkClass}>
              Accessories
            </NavLink>
          </nav>
          <div className={styles.mobileActions}>
            <Link
              to="/favorites"
              className={cn(styles.iconLink, {
                [styles.active]: isFavoritesActive,
              })}
            >
              <img src="img/icons/heart.svg" alt="Favorites" />
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </Link>
            <Link
              to="/cart"
              className={cn(styles.iconLink, { [styles.active]: isCartActive })}
            >
              <img src="img/icons/cart.svg" alt="Cart" />
              {totalCount > 0 && (
                <span className={styles.badge}>{totalCount}</span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
