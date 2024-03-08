/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import { GlobalContext } from '../GlobalContext';
import { BackButton } from '../components/BackButton';
import { CartItem } from '../components/CartItem';

import '../styles/CartPage.scss';

export const CartPage: React.FC = () => {
  const { cartList } = useContext(GlobalContext);
  let total = 0;

  cartList.forEach(cart => total += (cart.quantity * cart.product.price));

  return (
    <main className="cart-page">
      <BackButton />

      <h1 className="cart-page__title">
        Cart
      </h1>

      <section className="cart-page__content">
        <div className="cart-page__list">
          {cartList.map(item => (
            <CartItem item={item} />
          ))}
        </div>

        <div className="cart-page__total-block">
          <span className="cart-page__total-price">
            {`$${total}`}
          </span>

          <p className="cart-page__total-description">
            {`Total for ${cartList.length} item${cartList.length > 1 ? 's' : ''}`}
          </p>

          <button type="button" className="cart-page__checkout-button">
            Checkout
          </button>
        </div>
      </section>

    </main>
  );
};
