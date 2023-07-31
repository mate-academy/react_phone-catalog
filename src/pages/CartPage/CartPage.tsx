import React from 'react';

import { BackButton } from '../../components/BackButton/BackButton';
import { CartItem } from '../../components/CartItem/CartItem';

import './CartPage.scss';

export const CartPage: React.FC = () => {
  return (
    <div className="CartPage">
      <div className="container">
        <div className="CartPage__content">
          <BackButton />

          <h1 className="CartPage__title">Cart</h1>

          <div className="CartPage__blocks">
            <div className="CartPage__list">
              <CartItem />
            </div>

            <div className="CartPage__checkout">
              <div className="CartPage__checkout-content">
                <div className="CartPage__checkout-title">$1234</div>

                <div
                  className="CartPage__checkout-subtitle"
                >
                  Total for 3 items
                </div>

                <div className="CartPage__checkout-button">Checkout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
