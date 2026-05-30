import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import styles from './CartButton.module.scss';

import Bag from './icons/bag.png';
import DarkBag from './icons/bag-dark.png';

interface Props {
  onLinkClick?: () => void;
}

export const CartButton: React.FC<Props> = ({ onLinkClick }) => {
  const { getTotalQuantity } = useCart();
  const { theme } = useTheme();
  const count = getTotalQuantity();
  const cartIcon = theme === 'dark' ? DarkBag : Bag;

  return (
    <NavLink to="/cart" className={({ isActive }) => `${styles.button} ${isActive ? styles.active : ''}`} aria-label={`Shopping cart (${count} items)`} onClick={onLinkClick}>
      <div className={styles.iconWrapper}>
        {/* Shopping bag icon */}
        <img src={cartIcon} alt="cartIcon" className={styles.cartIcon} />

        {/* Badge counter - only show if count > 0 */}
        {count > 0 && <span className={styles.badge}>{count}</span>}
      </div>
    </NavLink>
  );
};
