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
          NICE GADGETS
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
            ♡
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
            🛒
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
