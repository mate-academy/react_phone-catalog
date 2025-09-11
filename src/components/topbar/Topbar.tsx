import { Link, NavLink } from 'react-router-dom';
import { Navigation } from '../Navigation/index';
import styles from './TopBar.module.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';

type Props = {
  isAside?: boolean;
};

export function TopBar({ isAside = false }: Props) {
  const { favorites } = useFavorites();
  const { cartItems, totalQuantity } = useCart();

  return (
    <div className={styles.topBar}>
      <div className={styles.topBar__leftSide}>
        <div className={styles.topBar__logo}>
          <a href="/" className={`${styles.icon} ${styles['icon--logo']}`}></a>
        </div>

        <Navigation />
      </div>

      {isAside ? (
        <div className={styles.topBar__rightIcons}>
          <div className={`${styles.topBar__iconElement} ${styles['topBar__iconElement--menu']}`}>
            <a href="/" className={`${styles.icon} ${styles['icon--close']}`}></a>
          </div>
        </div>
      ) : (
        <div className={styles.topBar__rightIcons}>
          <div className={`${styles.topBar__iconElement} ${styles['topBar__iconElement--menu']}`}>
            <Link to="/menu" className={`${styles.icon} ${styles['icon--menu']}`}></Link>
          </div>

          <div
            className={`${styles.topBar__iconElement} ${styles['topBar__iconElement--visibleOnTablet']}`}
          >
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? `${styles.icon} ${styles['icon--favorites']} ${styles['icon--active']}`
                  : `${styles.icon} ${styles['icon--favorites']}`
              }
            >
              {favorites.length > 0 && (
                <div className={styles.topBar__quantity}>{favorites.length}</div>
              )}
            </NavLink>
          </div>

          <div
            className={`${styles.topBar__iconElement} ${styles['topBar__iconElement--visibleOnTablet']}`}
          >
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `${styles.icon} ${styles['icon--cart']} ${styles['icon--active']}`
                  : `${styles.icon} ${styles['icon--cart']}`
              }
            >
              {cartItems.length > 0 && (
                <div className={styles.topBar__quantity}>{totalQuantity}</div>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
