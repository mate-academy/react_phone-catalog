/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { BackBtn } from '../../components/BackBtn';
import { CartItem } from '../../components/CartItem/CartItem';
import { CartList } from '../../types/CartList';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  removeFromCart,
  updateCountInCart,
} from '../../redux/reducers/cartSlice';

import './cart.scss';

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const totalCount = () => {
    return cart.reduce((prev, current) => prev + +current.count, 0);
  };

  const totalPrice = () => {
    return cart.reduce(
      (prev, current) => prev + current.item.price * +current.count, 0,
    );
  };

  const updateCount = (id: any, itemCount: any) => {
    dispatch(updateCountInCart({ id, itemCount }));
  };

  const deleteItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart">
      <div className="container">
        <BackBtn />

        {cart.length > 0 && (
          <div className="cart__block">
            <h1 className="cart__title title">Cart</h1>

            {cart.length > 0 && (
              <p className="cart__count">{`${cart.length} items`}</p>
            )}

            <div className="cart__content">
              <div className="cart__list">
                {cart
                  && cart.map((cartItem: CartList) => (
                    <CartItem
                      key={cartItem.item.id}
                      cartItem={cartItem}
                      updateCount={updateCount}
                      deleteItem={deleteItem}
                    />
                  ))}
              </div>

              <div className="cart__total">
                <div className="cart__sum">{`$${totalPrice()}`}</div>
                <div className="cart__itemsCount">
                  {`Total for ${totalCount()} items`}
                </div>
                <button type="button" className="cart__checkout">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {cart.length === 0 && (
          <div className="cart__empty">
            Cart is empty
          </div>
        )}

      </div>
    </div>
  );
};
