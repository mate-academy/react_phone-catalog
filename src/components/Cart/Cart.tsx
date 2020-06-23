import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from './CartContext';

export const Cart = () => {
  const { productInCart } = useContext(CartContext);

  return (
    <>
      <NavLink to="/cart">
        <li className="nav nav__bag" />
        {productInCart.length > 0
        && <span className="nav__favorite--span">{productInCart.length}</span>}
      </NavLink>
    </>
  );
};
