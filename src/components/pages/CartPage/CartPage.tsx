import React from 'react';
import { useCart } from '../../../context/CartContext';
import { CartItem } from '../../CartItem/CartItem';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const { cart, totalAmount, totalItems, handleCheckout } = useCart();
  const { isCheckout } = useCart();

  return (
    <div className="cart-page">
      <div className="cart-page__container">
        <button
          type="button"
          className="cart-page__back"
          onClick={() => window.history.back()}
        >
          <img
            src="/img/icons/arrow-left.svg"
            alt=""
            className="cart-page__back-icon"
          />
          Back
        </button>

        <h1 className="cart-page__title">Cart</h1>

        <div className="cart-page__content">
          <div className="cart-page__list">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="summary">
            <div className="summary__total">${totalAmount}</div>
            <div className="summary__count">Total for {totalItems} items</div>
            <div className="summary__line" />
            <button
              type="button"
              className="summary__checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
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
