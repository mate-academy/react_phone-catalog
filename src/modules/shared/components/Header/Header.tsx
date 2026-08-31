import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useState } from 'react';
import { BurgerMenu } from '../BurgerMenu';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoriteContext';
import { useProducts } from '../../hooks/useProducts';
import { getPublicPath } from '../../utils/getPublicPath';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { products } = useProducts();
  const { cart } = useCart();
  const { favorites } = useFavorites();

  const cartItems = cart
    .map(cartItem => {
      const product = products.find(p => p.itemId === cartItem.id);

      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter(Boolean);

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item?.quantity || 0),
    0,
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <NavLink to="/" className={styles.headerLogo}>
          <img
            className={styles.headerLogoIcon}
            src={getPublicPath('img/Logo.jpg')}
            alt="Logo"
          />
        </NavLink>

        <nav className={styles.headerNav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.headerLink} ${styles.active}`
                : styles.headerLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive
                ? `${styles.headerLink} ${styles.active}`
                : styles.headerLink
            }
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              isActive
                ? `${styles.headerLink} ${styles.active}`
                : styles.headerLink
            }
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive
                ? `${styles.headerLink} ${styles.active}`
                : styles.headerLink
            }
          >
            Accessories
          </NavLink>
        </nav>
      </div>

      <div className={styles.headerRight}>
        <NavLink to="/favorites" className={styles.headerUtil}>
          <div className={styles.headerUtilContainer}>
            <img
              src={getPublicPath('img/header-likes.jpg')}
              className={styles.headerIcon}
              alt="likes"
            />
            {favorites.length > 0 && (
              <span className={styles.headerCount}>{favorites.length}</span>
            )}
          </div>
        </NavLink>
        <NavLink to="/cart" className={styles.headerUtil}>
          <div className={styles.headerUtilContainer}>
            <img
              src={getPublicPath('img/header-solid.jpg')}
              className={styles.headerIcon}
              alt="solid"
            />
            {cart.length > 0 && (
              <span className={styles.headerCount}>{totalQuantity}</span>
            )}
          </div>
        </NavLink>
      </div>

      <div className={styles.headerBurgerMenu}>
        <button
          className={styles.headerBurgerMenu}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <BurgerMenu onClose={() => setIsMenuOpen(false)} isOpen={isMenuOpen} />
    </header>
  );
};
