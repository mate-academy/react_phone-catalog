import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { getTotalQuantity } = useCart();
  const { favorites } = useFavorites();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="Phone Catalog home">
          <i className="fas fa-mobile-alt" aria-hidden="true"></i>
          <span>Phone Catalog</span>
        </Link>

        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link
            to="/phones"
            className={`${styles.navLink} ${isActive('/phones') ? styles.active : ''}`}
          >
            Phones
          </Link>
          <Link
            to="/tablets"
            className={`${styles.navLink} ${isActive('/tablets') ? styles.active : ''}`}
          >
            Tablets
          </Link>
          <Link
            to="/accessories"
            className={`${styles.navLink} ${isActive('/accessories') ? styles.active : ''}`}
          >
            Accessories
          </Link>
        </nav>

        <div className={styles.actions}>
          <Link
            to="/favorites"
            className={styles.iconLink}
            aria-label="Favorites"
          >
            <i className="fas fa-heart" aria-hidden="true"></i>
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>
          <Link to="/cart" className={styles.iconLink} aria-label="Cart">
            <i className="fas fa-shopping-bag" aria-hidden="true"></i>
            {getTotalQuantity() > 0 && (
              <span className={styles.badge}>{getTotalQuantity()}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
