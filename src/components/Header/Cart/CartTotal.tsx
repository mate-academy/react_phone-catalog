import React from 'react';
import { useSelector } from 'react-redux';
import { getPrice } from '../../../redux';

export const CartTotal = ({ cartItems }: CartTotalProps) => {
  const price = useSelector(getPrice);

  return (
    <div className="cart__total">
      <div className="cart__total__info-container">
        <span className="cart__total__price">
          $
          {price}
        </span>
        <span className="cart__total__info">
          Total for
          {' '}
          {cartItems.length}
          {' '}
          items
        </span>
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
};
