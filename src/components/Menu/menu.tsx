import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { TopBar } from '../topbar';
import styles from './menu.module.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';

export const Menu = () => {
  const { favorites } = useFavorites();
  const { cartItems, totalQuantity } = useCart();

  return (
    <aside id="Menu" className={styles.menu}>
      <TopBar isAside={true} />
      <Navigation isAside={true} />

      <div className={styles.menu__bottomNavigation}>
        <Link
          to="/favorites"
          className={`${styles.menu__navigationItem} ${styles['menu__navigationItem--left']}`}
        >
          {favorites.length > 0 && <div className={styles.menu__quantity}>{favorites.length}</div>}
        </Link>

        <Link to="/cart" className={styles.menu__navigationItem}>
          {cartItems.length > 0 && <div className={styles.menu__quantity}>{totalQuantity}</div>}
        </Link>
      </div>
    </aside>
  );
};
