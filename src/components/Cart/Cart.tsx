import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <>
      <Link to="Cart" className="header__icons--item">
        <img src="../img/icons/cart.svg" alt="cart" className="header__icons--img" />
      </Link>
    </>
  );
};

export default Cart;
