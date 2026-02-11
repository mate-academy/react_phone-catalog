import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import HeartIcon from '../Header/icons/heart-icon.png';
import CartIcon from '../Header/icons/cart-icon.png';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useFavorites } from '../../context/FavoritesContext';

interface Props {
  onClose: () => void;
}

export const Menu: React.FC<Props> = ({ onClose }) => {
  const { cartItems } = useShoppingCart();
  const { favItems } = useFavorites();

  return (
    <div className={styles.menu}>
      <nav className={styles.menu__nav}>
        <NavLink to="/" className={styles.menu__nav_item} onClick={onClose}>HOME</NavLink>
        <NavLink to="/phones" className={styles.menu__nav_item} onClick={onClose}>PHONES</NavLink>
        <NavLink to="/tablets" className={styles.menu__nav_item} onClick={onClose}>TABLETS</NavLink>
        <NavLink to="/accessories" className={styles.menu__nav_item} onClick={onClose}>ACCESSORIES</NavLink>
      </nav>

      <div className={styles.menu__footer}>
        <NavLink to="/favorites" className={styles.menu__footer_icon} onClick={onClose}>
          <div className={styles.menu__icons__wrapper}>
            <img src={HeartIcon} alt="Favorites" />
            {favItems.length > 0 && (
              <div className={styles.menu__icons__amount}>{favItems.length}</div>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={styles.menu__footer_icon} onClick={onClose}>
          <div className={styles.menu__icons__wrapper}>
            <img src={CartIcon} alt="Cart" />
            {cartItems.length > 0 && (
              <div className={styles.menu__icons__amount}>{cartItems.length}</div>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
