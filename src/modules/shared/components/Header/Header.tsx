import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { useCart, useFavorites, useTheme } from '../../context';
import { Logo } from '../Logo';
import { Icon } from '../Icon';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header = () => {
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Logo />

          <nav className={styles.nav} aria-label="Main">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  classNames(styles.navLink, { [styles.active]: isActive })
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>

          <Link
            to="/favorites"
            className={classNames(styles.iconButton, styles.hideMobile)}
            aria-label="Favorites"
          >
            <Icon name="heart" />
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </Link>

          <Link
            to="/cart"
            className={classNames(styles.iconButton, styles.hideMobile)}
            aria-label="Cart"
          >
            <Icon name="cart" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>

          <button
            type="button"
            className={classNames(styles.iconButton, styles.menuButton)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(open => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  classNames(styles.mobileLink, {
                    [styles.mobileActive]: isActive,
                  })
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className={styles.mobileActions}>
            <Link
              to="/favorites"
              className={styles.mobileIcon}
              onClick={() => setMenuOpen(false)}
            >
              <Icon name="heart" />
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </Link>
            <Link
              to="/cart"
              className={styles.mobileIcon}
              onClick={() => setMenuOpen(false)}
            >
              <Icon name="cart" />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
