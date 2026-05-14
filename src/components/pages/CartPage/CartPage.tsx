/* eslint-disable max-len */
import React from 'react';
import { useCart } from '../../../context/CartContext';
import { CartItem } from '../../CartItem/CartItem';
import './CartPage.scss';

const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const CartPage: React.FC = () => {
  const { cart, totalAmount, totalItems, handleCheckout, isCheckout } =
    useCart();

  return (
    <div className="cart-page">
      <div className="cart-page__container">
        <button
          type="button"
          className="cart-page__back"
          onClick={() => window.history.back()}
          data-cy="backButton"
        >
          <img
            src={`${BASE}img/icons/arrow-left.svg`}
            alt=""
            className="cart-page__back-icon"
          />
          Back
        </button>

        <h1 className="cart-page__title">Cart</h1>

        <div className="cart-page__content">
          {cart.length > 0 ? (
            <>
              <div className="cart-page__list">
                {cart.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="summary">
                <div className="summary__total">${totalAmount}</div>
                <div className="summary__count">
                  Total for {totalItems} items
                </div>
                <div className="summary__line" />
                <button
                  type="button"
                  className="summary__checkout-btn"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </div>

      {isCheckout && (
        <div className="checkout-modal">
          <p>Checkout is not implemented yet</p>
        </div>
      )}
    </div>
  );
};
