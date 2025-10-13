import { NavLink } from 'react-router-dom';
import styles from './FavoriteAndCart.module.scss';
import favoriteIcon from '/icons/favorite-icon.png';
import cartIcon from '/icons/cart-icon.png';

type Props = {
  className?: string;
  isBurger?: boolean;
  onLinkClick?: () => void;
};

export const FavoriteAndCart: React.FC<Props> = ({
  className,
  isBurger,
  onLinkClick,
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
      </NavLink>
    </div>
  );
};
