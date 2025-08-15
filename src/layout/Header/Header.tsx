import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

import Logo from '../../assets/icons/logo.svg';
import FavoritesIcon from '../../assets/icons/favorites.svg';
import CartIcon from '../../assets/icons/cart.svg';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeEnum } from '../../types/Theme';

export const Header = () => {
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.leftSide}>
          <NavLink to="/" className={styles.logo}>
            <img src={Logo} alt="Nice Gadgets logo" />
          </NavLink>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Phones
            </NavLink>

            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Tablets
            </NavLink>

            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.spacer}></div>

        <div className={styles.rightSide}>
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === ThemeEnum.Light ? '🌙' : '🌞'}
          </button>

          <NavLink to="/favorites">
            <img src={FavoritesIcon} alt="Favorites" />
            {favorites.length > 0 && (
              <span className={styles.count}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink to="/cart">
            <img src={CartIcon} alt="Cart" />
            {cartItems.length > 0 && (
              <span className={styles.count}>{cartItems.length}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
