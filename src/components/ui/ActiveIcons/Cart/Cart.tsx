import React from 'react';
import './CartStyle.scss';

const Cart = () => {
  const number = 0;

  return (
    <div className="cart">
      <div className="cart__icon">
        <img src="icons/Cart.png" alt="cart" className="cart__icon--img" />
        <div className="cart__icon--counter">{number}</div>
      </div>
    </div>
  );
};

export default Cart;
