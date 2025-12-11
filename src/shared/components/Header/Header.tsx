import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { IconButton } from '../IconButton';
import { useContext, useState } from 'react';
import { FavoriteContext } from '../../contexts/FavoriteContext';
import { CartContext } from '../../contexts/CartContext';

import NiceGadgetsLogo from '../../../assets/logo/img.png';
import burgerIcon from '../../../assets/icons/burgerButton.svg';
import closeIcon from '../../../assets/icons/close.svg';
import heartIcon from '../../../assets/icons/heart.svg';
import basketIcon from '../../../assets/icons/basket.svg';

const menuItems = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header = () => {
  const { favorites } = useContext(FavoriteContext);
  const { cartItems } = useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.inner} grid-24 ${styles.grid}`}>
          <div className={styles.logo}>
            <NavLink to="/">
              <img
                className={styles.logo_img}
                src={NiceGadgetsLogo}
                alt="Nice Gadgets logo"
              />
            </NavLink>
          </div>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {menuItems.map(item => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.navLink} ${styles.active}`
                        : styles.navLink
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={styles.burgerButton}
            onClick={handleMenuOpen}
            aria-label="Open menu"
          >
            <img src={burgerIcon} alt="Menu" />
          </button>

          <div className={styles.actions}>
            <IconButton
              to="/favorites"
              src={heartIcon}
              alt="Favorites"
              count={favorites.length}
            />
            <IconButton
              to="/cart"
              src={basketIcon}
              alt="Cart"
              count={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            />
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <NavLink to="/" onClick={handleMenuClose}>
              <img
                className={styles.logo_img}
                src={NiceGadgetsLogo}
                alt="Nice Gadgets logo"
              />
            </NavLink>

            <button
              className={styles.closeButton}
              onClick={handleMenuClose}
              aria-label="Close menu"
            >
              <img src={closeIcon} alt="Close" />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              {menuItems.map(item => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={handleMenuClose}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}`
                        : styles.mobileNavLink
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileActions}>
            <div className={styles.mobileActionsItem} onClick={handleMenuClose}>
              <IconButton
                to="/favorites"
                src={heartIcon}
                alt="Favorites"
                count={favorites.length}
              />
            </div>

            <div className={styles.mobileActionsItem} onClick={handleMenuClose}>
              <IconButton
                to="/cart"
                src={basketIcon}
                alt="Cart"
                count={cartItems.length}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
