/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';

import { GlobalContext } from '../GlobalContext';
import { BackButton } from '../components/BackButton';
import { CartItem } from '../components/CartItem';
import { WarningMessage } from '../types/WarningMessage';

import '../styles/CartPage.scss';
import '../App.scss';

export const CartPage: React.FC = () => {
  const { cartList } = useContext(GlobalContext);
  const [isCheckoutMessage, setIsCheckoutMessage] = useState(false);

  let total = 0;

  cartList.forEach(cart => total += (
    cart.quantity * cart.product.price
  ));

  function getCheckoutMessage() {
    setIsCheckoutMessage(true);

    setTimeout(() => {
      setIsCheckoutMessage(false);
    }, 5000);
  }

  if (!cartList.length) {
    return (
      <main className="cart-page">
        <BackButton />

        <h1 className="warning">{WarningMessage.Cart}</h1>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <BackButton />

      <h1 className="cart-page__title">
        Cart
      </h1>

      <section className="cart-page__content">
        <div className="cart-page__list">
          {cartList.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-page__total-block">
          <span className="cart-page__total-price">
            {`$${total}`}
          </span>

          <p className="cart-page__total-description">
            {`Total for ${cartList.length} item${cartList.length > 1 ? 's' : ''}`}
          </p>

          <button
            type="button"
            className="cart-page__checkout-button"
            onClick={getCheckoutMessage}
          >
            Checkout
          </button>

          {isCheckoutMessage && (
            <p className="cart-page__checkout-message">
              {WarningMessage.Checkout}
            </p>
          )}
        </div>
      </section>

    </main>
  );
};
