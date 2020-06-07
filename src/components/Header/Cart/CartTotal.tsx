import React from 'react';

export const CartTotal = () => {
  return (
    <div className="cart__total">
      <div className="cart__total__info-container">
        <span className="cart__total__price">$3272</span>
        <span className="cart__total__info">Total for 3 items</span>
      </div>
      <button
        type="button"
        className="cart__total__button"
        aria-label="Checkout"
      >
        Checkout
      </button>
    </div>
  );
}
