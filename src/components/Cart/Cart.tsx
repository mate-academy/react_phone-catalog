import React, { useContext } from 'react';
import { ButtonBack } from '../Blocs';
import { Context } from '../context';
import { CartItem } from './CartItem';

export const Cart: React.FC = () => {
  const { cart } = useContext(Context);

  return cart?.length !== 0 ? (
    <main className="cart">
      <ButtonBack />
      <h1>Cart</h1>

      <div className="cart__content grid">
        <div className="cart__list grid_item_column--1-17">
          {cart?.map(product => {
            return (
              <CartItem product={product} />
            );
          })}
        </div>
        <div className="cart__totalPrice grid_item_column--17-25">
          <h1 className="cart__totalPrice__price">
            $
            {cart?.reduce((count, item) => (
              count + +item.price * (item.amount || 1)
            ), 0)}
          </h1>
          <h5 className="cart__totalPrice__items">
            Total for
            {' '}
            {cart?.reduce((count, item) => (
              count + (item.amount || 1)
            ), 0)}
            {' '}
            items
          </h5>
          <div className="line" />
          <div className="cart__totalPrice__button">Checkout</div>
        </div>
      </div>
    </main>
  ) : (<main><h1>No products in cart</h1></main>);
};
