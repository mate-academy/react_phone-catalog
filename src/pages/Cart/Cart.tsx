import React, { useEffect, useState } from 'react';
import { BackBtn } from '../../components/BackBtn';
import { CartItem } from '../../components/CartItem/CartItem';
import { CartList } from '../../types/CartList';

import './cart.scss';

export const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartList[]>([]);

  useEffect(() => {
    const storageValue: string | null = localStorage.getItem('cart');
    const parsedStorage: CartList[] | [] = storageValue
      ? JSON.parse(storageValue)
      : [];

    setCart(parsedStorage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalCount = () => {
    return cart.reduce((prev, current) => (
      prev + +current.count
    ), 0);
  };

  const totalPrice = () => {
    return cart.reduce((prev, current) => (
      prev + (current.item.price * +current.count)
    ), 0);
  };

  const updateCount = (id: any, itemCount: any) => {
    setCart(cart.map((cartItem: any) => {
      if (id === cartItem.item.id) {
        return ({
          ...cartItem,
          count: itemCount,
        });
      }

      return cartItem;
    }));
  };

  const deleteItem = (id: string) => {
    setCart(cart.filter((cartItem) => cartItem.item.id !== id));
  };

  return (
    <div className="cart">
      <div className="container">
        <BackBtn />

        {cart.length > 0 && (
          <div className="cart__block">
            <h1 className="cart__title title">
              Cart
            </h1>

            {cart.length > 0 && (
              <p className="cart__count">
                {`${cart.length} items`}
              </p>
            )}

            <div className="cart__content">
              <div className="cart__list">
                {cart && cart.map((cartItem: CartList) => (
                  <CartItem
                    key={cartItem.item.id}
                    cartItem={cartItem}
                    updateCount={updateCount}
                    deleteItem={deleteItem}
                  />
                ))}
              </div>

              <div className="cart__total">
                <div className="cart__sum">
                  {`$${totalPrice()}`}
                </div>
                <div className="cart__itemsCount">
                  {`Total for ${totalCount()} items`}
                </div>
                <button
                  type="button"
                  className="cart__checkout"
                >
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
