import classNames from 'classnames';
import React, { useState, useContext } from 'react';
import { ProductType } from '../../types/Product';
import { Context } from '../context';
import { useLocalStorage } from '../../hooks/use--localStorage';

interface CartItemProps {
  product: ProductType
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { setCart, cart } = useContext(Context);
  const [counter, setCounter] = useState(product.amount ? +product.amount : 1);
  const [cartLocalStorage, setCartLocalStorage,
  ] = useLocalStorage('cart', cart);

  const setNewValueCart = (item: ProductType, number: number) => {
    if (item.id !== product.id) {
      return item;
    }

    return ({
      ...item,
      amount: counter + number,
    });
  };

  return (
    <div className="cart__item">
      <button
        type="button"
        className="cart__item__delete grid_item_column--1-2"
        onClick={() => {
          setCartLocalStorage(cartLocalStorage
            .filter((item: ProductType) => item.id !== product.id));
          setCart(cartList => cartList?.filter(item => item.id !== product.id));
        }}
      >
        x
      </button>
      <img
        src={product.imageUrl}
        alt="img"
        className="cart__item__img grid_item_column--3-5"
      />
      <p className="cart__item__name grid_item_column--6-13">
        {product.name}
      </p>

      <div className="cart__item__counter">
        <button
          type="button"
          className={classNames(
            'button',
            'cart__item__button',
            { 'slick-disabled': counter === 1 },
          )}
          onClick={() => {
            setCounter(prev => prev - 1);
            setCartLocalStorage(cart && (cart
              .map((item: ProductType) => setNewValueCart(item, (-1)))));
            setCart(products => products
              && (products.map(item => setNewValueCart(item, (-1)))));
          }}
          disabled={counter === 1}
        >
          -
        </button>

        <div className="cart__item__count grid_item_column--13-15">
          {counter}
        </div>

        <button
          type="button"
          className="button cart__item__button"
          onClick={() => {
            setCounter(prev => prev + 1);
            setCartLocalStorage(cart && (cart
              .map((item: ProductType) => setNewValueCart(item, 1))));
            setCart(products => products
              && (products.map(item => setNewValueCart(item, 1))));
          }}
        >
          +
        </button>
      </div>

      <div className="cart__item__price grid_item_column--15-17">
        $
        {product.price}
      </div>

    </div>
  );
};
