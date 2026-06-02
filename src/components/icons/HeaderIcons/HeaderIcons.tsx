import { NavLink } from 'react-router-dom';
import styles from './HeaderIcons.module.scss';
import { useCart } from '../../../pages/CartPage/context/CartContext';
import { useFavorite } from '../../../pages/FavoritePage/context/FavoriteContext';

type Props = {
  className: string;
  classIcon: string;
  onClose?: () => void;
};

export const HeaderIcons = ({ className, classIcon, onClose }: Props) => {
  const { cartItems } = useCart();
  const { favoriteItems } = useFavorite();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={className || ''}>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `${classIcon || ''} ${isActive ? styles.active : ''}`
        }
        onClick={onClose}
      >
        <img src="/img/header/Favourites.svg" alt="Nice Gadgets" />
        {favoriteItems.length > 0 && (
          <span className={styles.badge}>{favoriteItems.length}</span>
        )}
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `${classIcon || ''} ${isActive ? styles.active : ''}`
        }
        onClick={onClose}
      >
        <img src="/img/header/Cart.svg" alt="Nice Gadgets" />
        {cartItems.length > 0 && (
          <span className={styles.badge}>{totalCount}</span>
        )}
      </NavLink>
    </div>
  );
};
