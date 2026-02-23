import React from 'react';

import { NavLink } from 'react-router-dom';
import cartIcon from '../../../assets/icons/shopping-bag-cart.svg';
import styles from './CartIcon.module.scss';

interface CartProps {
  className: string;
}

export const CartIcon: React.FC<CartProps> = ({ className }) => {
  return (
    <NavLink to="/cart" className={className}>
      <img src={cartIcon} alt="Cart" className={styles.icon} />
    </NavLink>
  );
};
