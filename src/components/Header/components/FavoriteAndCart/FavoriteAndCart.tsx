import { NavLink } from 'react-router-dom';
import styles from './FavoriteAndCart.module.scss';
import favoriteIcon from '/icons/favorite-icon.png';
import cartIcon from '/icons/cart-icon.png';

type Props = {
  className?: string;
  isBurger?: boolean;
};

export const FavoriteAndCart: React.FC<Props> = ({ className, isBurger }) => {
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
            isActive && isBurger ? styles.active : ''
          }`
        }
      >
        <img src={favoriteIcon} alt="favoriteIcon" />
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `${styles.icon} ${isBurger ? styles.burgerIconSecond : ''} ${
            isActive && isBurger ? styles.active : ''
          }`
        }
      >
        <img src={cartIcon} alt="cartIcon" />
      </NavLink>
    </div>
  );
};
