import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getPrice } from '../../../redux';

export const CartTotal = ({ cartItems }: CartTotalProps) => {
  const price = useSelector(getPrice);

  const totalItems = useMemo(
    () => cartItems.reduce((acc, item) => item.quantity! + acc, 0),
    [cartItems]
  );

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
          {totalItems}
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
