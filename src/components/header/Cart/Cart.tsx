import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Cart.scss';
import { CartContext } from '../../../helpers/CartContext';

const Cart = () => {
  const { itemInCart } = useContext(CartContext);

  return (
    <NavLink
      to="/cart"
      className="cart-link"
    >
      <img src="./img/ShoppingBag.svg" alt="ShoppingBag" />
      {itemInCart.length > 0 && <span className="favorite-link__span">{itemInCart.length}</span>}
    </NavLink>
  );
};

export default Cart;
