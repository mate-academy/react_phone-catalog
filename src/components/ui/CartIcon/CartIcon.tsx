import React from 'react';

import { NavLink } from 'react-router-dom';
import cartIcon from '../../../assets/icons/shopping-bag-cart.svg';

interface CartProps {
  className: string;
}

export const CartIcon: React.FC<CartProps> = ({ className }) => {
  return (
    <NavLink to="/cart" className={className}>
      <img src={cartIcon} alt="Cart" />
    </NavLink>
  );
};
