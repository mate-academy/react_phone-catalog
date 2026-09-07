import React from 'react';

export const CartEmpty: React.FC = () => {
  return (
    <>
      <p className="cart__empty-text">Your cart is empty</p>
      <img
        className="cart__empty_image"
        src="./img/cart-is-empty.png"
        alt="Empty cart"
      />
    </>
  );
};
