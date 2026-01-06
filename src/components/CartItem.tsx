import React from 'react';
import { CartItemType } from '../types/CartItemType';
import './CartItem.scss';
import { useCartContext } from '../context/CartContext';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { increase, decrease, remove } = useCartContext();

  return (
    <div className="cart-item">
      {/* REMOVE */}
      <button className="cart-item__remove" onClick={() => remove(item.id)}>
        ×
      </button>

      {/* IMAGE */}
      <img src={item.image} alt={item.name} className="cart-item__image" />
      {/* NAME */}
      <p className="cart-item__name">{item.name}</p>

      {/* COUNTER */}
      <div className="cart-item__second-row">
        <div className="cart-item__counter">
          <button
            className="cart-item__btn cart-item__btn--minus"
            onClick={() => decrease(item.id)}
          >
            <img src={`img/icons/minus.svg`} alt="-" />
          </button>
          <span className="cart-item__count">{item.quantity}</span>
          <button
            className="cart-item__btn cart-item__btn--plus"
            onClick={() => increase(item.id)}
          >
            <img src={`img/icons/plus.svg`} alt="+" />
          </button>
        </div>

        {/* PRICE */}
        <div className="cart-item__price">
          <span>${item.price * item.quantity}</span>
        </div>
      </div>
    </div>
  );
};
