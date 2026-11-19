import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { NAV_ITEMS } from '../constants/navigation';
import { SearchInput } from '../SearchInput';
import { getImageUrl } from '../utils/images';
import styles from './Header.module.scss';

const THEME_STORAGE_KEY = 'phone-theme';
const SEARCHABLE_PATHS = ['/phones', '/tablets', '/accessories'];

export const Header = () => {
  const { cartCount, favorites } = useShop();
  const location = useLocation();
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem(THEME_STORAGE_KEY) ?? 'light',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const isSearchable = SEARCHABLE_PATHS.some(
    path => location.pathname === path,
  );

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="Nice Gadgets home">
          <span className={styles.logoRow}>
            NICE
            <img
              src={getImageUrl('/img/favicon.png')}
              alt=""
              className={styles.logoImg}
            />
          </span>
          <span>GADGETS</span>
        </Link>
        <nav className={styles.nav}>
          {NAV_ITEMS.map(item => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className={styles.actions}>
          {isSearchable && <SearchInput />}
          <Link
            to="/favorites"
            className={styles.iconButton}
            aria-label="Favorites"
          >
            <i className="fas fa-heart" />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>
          <Link to="/cart" className={styles.iconButton} aria-label="Cart">
            <i className="fas fa-shopping-cart" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label="Toggle color theme"
          >
            <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'} />
          </button>
        </div>
      </div>
    </header>
  );
};
