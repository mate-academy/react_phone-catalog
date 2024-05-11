import React from 'react';
import cart from './../../../img/Icons/Cart.png';
import './CartStyle.scss';

const Cart = () => {
  const number = 0;

  return (
    <div className="cart">
      <div className="cart__icon">
        <img src={cart} alt="cart" className="cart__icon--img" />
        <div className="cart__icon--counter">{number}</div>
      </div>
    </div>
  );
};

export default Cart;
