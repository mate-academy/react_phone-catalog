import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

import Logo from '../../assets/icons/logo.svg';
import MenuIcon from '../../assets/icons/burger-menu.svg';
import CloseIcon from '../../assets/icons/close.svg';
import FavoritesIcon from '../../assets/icons/favorites.svg';
import CartIcon from '../../assets/icons/cart.svg';

import { useTheme } from '../../context/ThemeContext';
import { ThemeEnum } from '../../types/Theme';

import { Navigation } from './components/Navigation';
import { BurgerMenu } from './components/BurgerMenu';
import { HistoryNavigation } from '../../component/HistoryNavigation';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <NavLink to="/" className={styles.logo}>
          <img src={Logo} alt="Nice Gadgets logo" />
        </NavLink>

        <Navigation onClose={closeMenu} />

        <div className={styles.navigationAndHistory}>
          <div className={styles.rightSide}>
            <NavLink to="/favorites" className={styles.rightSideLink}>
              <img
                src={FavoritesIcon}
                alt="Favorites"
                className={`${styles.icon} ${favorites.length > 0 ? styles.activeIcon : ''}`}
              />
              {favorites.length > 0 && (
                <span className={styles.count}>{favorites.length}</span>
              )}
            </NavLink>

            <NavLink to="/cart" className={styles.rightSideLink}>
              <img
                src={CartIcon}
                alt="Cart"
                className={`${styles.icon} ${cartItems.length > 0 ? styles.activeIcon : ''}`}
              />
              {cartItems.length > 0 && (
                <span className={styles.count}>{cartItems.length}</span>
              )}
            </NavLink>

            <button
              type="button"
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Toggle theme"
            >
              {theme === ThemeEnum.Light ? '🌙' : '🌞'}
            </button>

            <button
              type="button"
              onClick={toggleMenu}
              className={styles.burgerButton}
              aria-label="Toggle menu"
            >
              <img src={isMenuOpen ? CloseIcon : MenuIcon} alt="Menu" />
            </button>
          </div>

          <HistoryNavigation />
        </div>
      </div>

      {isMenuOpen && (
        <BurgerMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      )}
    </header>
  );
};
