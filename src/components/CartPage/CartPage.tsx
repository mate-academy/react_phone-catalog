import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearCart,
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
} from '../../features/cart';
import { CartItem } from '../CartItem/CartItem';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectTotalAmount);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  const handleCheckout = () => {
    const isConfirmed = window.confirm('Checkout confirmed');

    if (isConfirmed) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="container">
      <div className="cart-page">
        <div className="cart-page__back-btn" onClick={() => navigate(-1)}>
          <div className="cart-page__back-btn-icon"></div>
          <p className="cart-page__back-btn-text">Back</p>
        </div>

        <h1 className="cart-page__title">Cart</h1>

        {cartItems.length === 0 ? (
          <p className="cart-page__empty">Cart is empty</p>
        ) : (
          <div className="cart-page__content">
            <div className="cart-page__list">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-page__summary">
              <div className="cart-page__summary-info">
                <h2 className="cart-page__total-price">${totalAmount}</h2>
                <p className="cart-page__total-count">
                  {'Total for'} {totalQuantity} {'items'}
                </p>
              </div>

              <div className="cart-page__checkout-divider"></div>

              <button
                className="cart-page__checkout-btn"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
