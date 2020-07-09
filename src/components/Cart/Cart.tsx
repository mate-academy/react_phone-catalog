import React from 'react';
import { NavLink } from 'react-router-dom';
// import { CartContext } from './CartContext';
import { useSelector } from 'react-redux';
import { getCart } from '../../store/index';


export const Cart = () => {
  // const { productInCart } = useContext(CartContext);
  const productInCart = useSelector(getCart);

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
