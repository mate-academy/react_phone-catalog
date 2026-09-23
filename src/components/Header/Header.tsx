import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.scss';
import { getBaseUrl } from '../../utils/BaseUrl';

export const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Вычисляем общее количество товаров в корзине
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.mobileNavLink} ${styles.active}`
      : styles.mobileNavLink;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.leftContent}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src={`${getBaseUrl()}img/logo.svg`} alt="Nice Gadgets Logo" />
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getNavLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getNavLinkClass}>
            Accessories
          </NavLink>
        </nav>
      </div>

      {/* Иконки избранного/корзины — видны только от 640px и шире */}
      <div className={styles.rightContent}>
        <NavLink to="/favorites" className={styles.iconBtn}>
          <img
            src={`${getBaseUrl()}img/icons/favourites.svg`}
            alt="Favorites"
          />
          {favorites.length > 0 && (
            <span className={styles.badge}>{favorites.length}</span>
          )}
        </NavLink>

        <NavLink to="/cart" className={styles.iconBtn}>
          <img src={`${getBaseUrl()}img/icons/shopping-bag.svg`} alt="Cart" />
          {cartItemsCount > 0 && (
            <span className={styles.badge}>{cartItemsCount}</span>
          )}
        </NavLink>
      </div>

      {/* Бургер-кнопка — видна только до 640px */}
      <button
        type="button"
        className={styles.burger}
        onClick={() => setIsMenuOpen(prev => !prev)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 2L14 14M14 2L2 14"
              stroke="#0F0F11"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 2H15M1 8H15M1 14H15"
              stroke="#0F0F11"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Полноэкранное мобильное меню */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <NavLink
              to="/"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Accessories
            </NavLink>
          </nav>

          <div className={styles.mobileIcons}>
            <NavLink
              to="/favorites"
              className={styles.mobileIconBtn}
              onClick={closeMenu}
            >
              <img
                src={`${getBaseUrl()}img/icons/favourites.svg`}
                alt="Favorites"
              />
              {favorites.length > 0 && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={styles.mobileIconBtn}
              onClick={closeMenu}
            >
              <img
                src={`${getBaseUrl()}img/icons/shopping-bag.svg`}
                alt="Cart"
              />
              {cartItemsCount > 0 && (
                <span className={styles.badge}>{cartItemsCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
