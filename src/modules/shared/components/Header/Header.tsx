import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useShop } from '../../../../context/ShopContext';

import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { favoriteItems, cartQuantities } = useShop();

  const favoritesCount = favoriteItems.length;

  const cartCount = Object.values(cartQuantities).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoTop}>
            NICE<span className={styles.logoEmoji}>👌</span>
          </span>

          <span className={styles.logoBottom}>GADGETS</span>
        </NavLink>

        <nav
          id="main-navigation"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/phones" onClick={closeMenu}>
            Phones
          </NavLink>

          <NavLink to="/tablets" onClick={closeMenu}>
            Tablets
          </NavLink>

          <NavLink to="/accessories" onClick={closeMenu}>
            Accessories
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={styles.actionLink}
            aria-label={`Favorites (${favoritesCount})`}
            onClick={closeMenu}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path
                d={[
                  'M20.8 4.6a5.5 5.5 0 0 0-7.8 0',
                  'L12 5.7l-1.1-1.1',
                  'a5.5 5.5 0 0 0-7.8 7.8',
                  'L12 21l8.8-8.6',
                  'a5.5 5.5 0 0 0 0-7.8Z',
                ].join('')}
              />
            </svg>

            {favoritesCount > 0 && (
              <span className={styles.counter}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={styles.actionLink}
            aria-label={`Cart (${cartCount})`}
            onClick={closeMenu}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="8" width="16" height="12" rx="2" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>

            {cartCount > 0 && (
              <span className={styles.counter}>{cartCount}</span>
            )}
          </NavLink>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};
