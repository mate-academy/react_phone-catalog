import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { to: '/', label: 'HOME' },
  { to: '/phones', label: 'PHONES' },
  { to: '/tablets', label: 'TABLETS' },
  { to: '/accessories', label: 'ACCESSORIES' },
];

export const Header = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.burger}
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <Link to="/" className={styles.logo} onClick={closeMenu}>
          NICE
          <span>GADGETS</span>
        </Link>

        <nav className={styles.navigation}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`${styles.link} ${
                pathname === link.to ? styles.linkActive : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link to="/favorites" className={styles.action} onClick={closeMenu}>
            ♡
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>

          <Link to="/cart" className={styles.action} onClick={closeMenu}>
            🛒
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={styles.mobileLink}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
