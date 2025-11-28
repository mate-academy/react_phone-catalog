import { NavLink } from 'react-router-dom';
import styles from './FavoriteAndCart.module.scss';
import favoriteIcon from '/icons/favorite-icon.png';
import cartIcon from '/icons/cart-icon.png';

type Props = {
  className?: string;
  isBurger?: boolean;
  onLinkClick?: () => void;
  cartCount: number;
  favCount: number;
};

export const FavoriteAndCart: React.FC<Props> = ({
  className,
  isBurger,
  onLinkClick,
  cartCount,
  favCount,
}) => {
  return (
    <div
      className={`${styles.fav_cart_icons} ${className || ''} ${
        isBurger ? styles.burgerIconWrapper : ''
      }`}
    >
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `${styles.icon} ${isBurger ? styles.burgerIcon : ''} ${
            isActive ? styles.active : ''
          }`
        }
        onClick={onLinkClick}
      >
        <img src={favoriteIcon} alt="favoriteIcon" />
        {favCount > 0 && (
          <span className={`${styles.badge} ${styles.favCount}`}>
            {favCount}
          </span>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `${styles.icon} ${isBurger ? styles.burgerIconSecond : ''} ${
            isActive ? styles.active : ''
          }`
        }
        onClick={onLinkClick}
      >
        <img src={cartIcon} alt="cartIcon" />
        {cartCount > 0 && (
          <span className={`${styles.badge} ${styles.cartCount}`}>
            {cartCount}
          </span>
        )}
      </NavLink>
    </div>
  );
};
