import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { TopBar } from '../topbar';
import styles from './menu.module.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Menu = () => {
  const { favorites } = useFavorites();
  const { cartItems, totalQuantity } = useCart();
  const { theme } = useTheme();

  return (
    <aside id="Menu" className={styles.menu}>
      <TopBar isAside={true} />
      <Navigation isAside={true} />

      <div
        className={`${styles.menu__bottomNavigation} ${theme === 'light' && styles['menu__bottomNavigation--lightTheme']}`}
      >
        <Link
          to="/favorites"
          className={`${styles.menu__navigationItem} ${styles['menu__navigationItem--left']} ${theme === 'light' && styles['menu__navigationItem--lightTheme-left']}`}
        >
          {favorites.length > 0 && (
            <div
              className={`${styles.menu__quantity} ${theme === 'light' && styles['menu__quantity--lightTheme']}`}
            >
              {favorites.length}
            </div>
          )}
        </Link>

        <Link
          to="/cart"
          className={`${styles.menu__navigationItem} ${theme === 'light' && styles['menu__navigationItem--lightTheme']}`}
        >
          {cartItems.length > 0 && (
            <div
              className={`${styles.menu__quantity} ${theme === 'light' && styles['menu__quantity--lightTheme']}`}
            >
              {totalQuantity}
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};
