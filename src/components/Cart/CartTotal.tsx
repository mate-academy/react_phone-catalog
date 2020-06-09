import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPrice } from '../../redux';
import { resetCart } from '../../redux/cart';

export const CartTotal = ({ cartItems }: CartTotalProps) => {
  const price = useSelector(getPrice);
  const dispatch = useDispatch();

  const totalItems = useMemo(
    () => cartItems.reduce((acc, item) => item.quantity! + acc, 0),
    [cartItems],
  );

  const handleResetCart = useCallback(
    () => dispatch(resetCart()),
    [dispatch],
  );

  return (
    <div className="cart-total">
      <div className="cart-total__info-container">
        <span className="cart-total__price">
          $
          {price}
        </span>
        <span className="cart-total__info">
          Total for
          {' '}
          {totalItems}
          {' '}
          items
        </span>
      </div>
      <Link
        to="/checkout"
        className="cart-total__button"
        onClick={handleResetCart}
      >
        Checkout
      </Link>
    </div>
  );
};
