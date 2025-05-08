import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import styles from './HamburgerMenu.module.scss';

const HamburgerMenu: React.FC = () => {
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalCartQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalFavorites = favorites.length;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        ☰
      </button>

      {isMenuOpen && (
        <div className={styles.hamburgerMenu}>
          {/* Top Section */}
          <div className={styles.topSection}>
            <Link to="/" className={styles.logo}>
              <img src="/img/icons/dark_logo.svg" alt="Logo" />
            </Link>
            <div className={styles.divider}></div>
            <button
              className={styles.closeButton}
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <img
                src="/img/icons/Union.svg"
                alt="Close"
                className={styles.icon}
              ></img>
            </button>
          </div>

          {/* Middle Section: Links */}
          <div className={styles.middleSection}>
            <div className={styles.links}>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/phones" onClick={() => setIsMenuOpen(false)}>
                Phones
              </Link>
              <Link to="/tablets" onClick={() => setIsMenuOpen(false)}>
                Tablets
              </Link>
              <Link to="/accessories" onClick={() => setIsMenuOpen(false)}>
                Accessories
              </Link>
            </div>
          </div>

          {/* Bottom Section: Heart and Bag */}
          <div className={styles.bottomSection}>
            <Link
              to="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className={styles.iconLink}
            >
              <img
                src="/img/icons/dark_like.svg"
                alt="Favorites"
                className={styles.icon}
              />
              {totalFavorites > 0 && (
                <span className={styles.count}>({totalFavorites})</span>
              )}
            </Link>
            <div className={styles.dividerb} />
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className={styles.iconLink}
            >
              <img
                src="/img/icons/dark_cart.svg"
                alt="Cart"
                className={styles.icon}
              />

              {totalCartQuantity > 0 && (
                <span className={styles.count}>({totalCartQuantity})</span>
              )}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
