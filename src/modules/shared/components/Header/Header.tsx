import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { useCart, useFavorites } from '../../context';
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
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.iconButton, styles.hideMobile, {
                [styles.iconActive]: isActive,
              })
            }
            aria-label="Favorites"
          >
            <Icon name="heart" />
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.iconButton, styles.hideMobile, {
                [styles.iconActive]: isActive,
              })
            }
            aria-label="Cart"
          >
            <Icon name="cart" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>

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
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                classNames(styles.mobileIcon, {
                  [styles.mobileIconActive]: isActive,
                })
              }
              onClick={() => setMenuOpen(false)}
              aria-label="Favorites"
            >
              <Icon name="heart" />
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                classNames(styles.mobileIcon, {
                  [styles.mobileIconActive]: isActive,
                })
              }
              onClick={() => setMenuOpen(false)}
              aria-label="Cart"
            >
              <Icon name="cart" />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
