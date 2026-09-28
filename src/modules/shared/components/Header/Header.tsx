import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { useSearchContext } from '../../context/SearchContext';
import { Icon } from '../Icon';
import { SearchInput } from '../SearchInput';
import styles from './Header.module.scss';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.navLink, { [styles.active]: isActive });

export const Header: React.FC = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const search = useSearchContext();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          Nice<span>Gadgets</span>
        </NavLink>

        <nav className={styles.nav} aria-label="Main">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {search.isActive && (
          <div className={styles.search}>
            <SearchInput
              value={search.query}
              onChange={search.setQuery}
              placeholder={search.placeholder}
            />
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconLink}
            aria-label={
              theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
            onClick={toggleTheme}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>

          <NavLink
            to="/favorites"
            className={styles.iconLink}
            aria-label="Favorites"
          >
            <Icon name="heart" />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={styles.iconLink} aria-label="Cart">
            <Icon name="cart" />
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </NavLink>

          <button
            type="button"
            className={styles.menuButton}
            aria-label="Toggle menu"
            onClick={() => setMobileNavOpen(prev => !prev)}
          >
            <Icon name={mobileNavOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <nav className={styles.mobileNav} aria-label="Main mobile">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
              onClick={() => setMobileNavOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}

      {search.isActive && (
        <div className={styles.mobileSearchBar}>
          <SearchInput
            value={search.query}
            onChange={search.setQuery}
            placeholder={search.placeholder}
          />
        </div>
      )}
    </header>
  );
};
