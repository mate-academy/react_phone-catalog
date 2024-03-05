/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import { GlobalContext } from '../GlobalContext';
import { BackButton } from '../components/BackButton';
import { CartItem } from '../components/CartItem';

import '../styles/CartPage.scss';

export const CartPage: React.FC = () => {
  const { cartList } = useContext(GlobalContext);

  // console.log(cartList);

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

        <div className="cart-page__total">
          a
        </div>
      </section>

    </main>
  );
};
