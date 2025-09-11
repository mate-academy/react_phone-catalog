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
        className={`${styles.icon} ${isBurger ? styles.burgerIcon : ''}`}
      >
        <img src={favoriteIcon} alt="favoriteIcon" />
      </NavLink>
      <NavLink
        to="/cart"
        className={`${styles.icon} ${isBurger ? styles.burgerIconSecond : ''}`}
      >
        <img src={cartIcon} alt="cartIcon" />
      </NavLink>
    </div>
  );
};
