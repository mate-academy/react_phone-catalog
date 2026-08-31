import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoriteContext';
import { useProducts } from '../../hooks/useProducts';
import { getPublicPath } from '../../utils/getPublicPath';
type Props = { onClose: () => void; isOpen: boolean };

export const BurgerMenu: React.FC<Props> = ({ onClose, isOpen }) => {
  const { cart } = useCart();
  const { products } = useProducts();
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
    <div
      className={
        isOpen ? `${styles.burgerMenu} ${styles.open}` : styles.burgerMenu
      }
    >
      <nav className={styles.burgerMenuNavigation}>
        <NavLink
          to="/"
          onClick={onClose}
          className={({ isActive }) =>
            isActive
              ? `${styles.burgerMenuLink} ${styles.active}`
              : styles.burgerMenuLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          onClick={onClose}
          className={({ isActive }) =>
            isActive
              ? `${styles.burgerMenuLink} ${styles.active}`
              : styles.burgerMenuLink
          }
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          onClick={onClose}
          className={({ isActive }) =>
            isActive
              ? `${styles.burgerMenuLink} ${styles.active}`
              : styles.burgerMenuLink
          }
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          onClick={onClose}
          className={({ isActive }) =>
            isActive
              ? `${styles.burgerMenuLink} ${styles.active}`
              : styles.burgerMenuLink
          }
        >
          Accessories
        </NavLink>
      </nav>

      <nav className={styles.burgerMenuUtils}>
        <NavLink
          to="/favorites"
          onClick={onClose}
          className={({ isActive }) =>
            isActive
              ? `${styles.burgerMenuUtil} ${styles.active}`
              : styles.burgerMenuUtil
          }
        >
          <div className={styles.burgerMenuUtilContainer}>
            <img
              src={getPublicPath('img/header-likes.jpg')}
              className={styles.burgerMenuIcon}
              alt="likes"
            />
            {favorites.length > 0 && (
              <span className={styles.burgerMenuCount}>{favorites.length}</span>
            )}
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          onClick={onClose}
          className={({ isActive }) =>
            isActive
              ? `${styles.burgerMenuUtil} ${styles.active}`
              : styles.burgerMenuUtil
          }
        >
          <div className={styles.burgerMenuUtilContainer}>
            <img
              src={getPublicPath('img/header-solid.jpg')}
              className={styles.burgerMenuIcon}
              alt="solid"
            />
            {cart.length > 0 && (
              <span className={styles.burgerMenuCount}>{totalQuantity}</span>
            )}
          </div>
        </NavLink>
      </nav>
    </div>
  );
};
