import React from 'react';
import { CartItem as CartItemType } from '../../types/CartItem';
import { useAppDispatch } from '../../app/hooks';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../features/cart';
import cn from 'classnames';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { product, quantity, id } = item;

  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => dispatch(removeFromCart(id))}
        />

        <div className="cart-item__image-container">
          <img
            src={product.image}
            alt={product.name}
            className="cart-item__image"
          />
        </div>

        <p className="cart-item__name">{product.name}</p>
      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__quantity-wrapper">
          <button
            type="button"
            className={cn('cart-item__button', {
              'cart-item__button--disabled': quantity === 1,
            })}
            onClick={() => dispatch(decreaseQuantity(id))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="cart-item__quantity">{quantity}</span>
          <button
            type="button"
            className="cart-item__button"
            onClick={() => dispatch(increaseQuantity(id))}
          >
            +
          </button>
        </div>

        <p className="cart-item__price">${product.price}</p>
      </div>
    </div>
  );
};
