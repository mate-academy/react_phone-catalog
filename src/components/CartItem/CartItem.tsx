import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { CartItemType } from '../../types/CartItemType';
import { BASE_URL } from '../../utils/fetchClient';
import './CartItem.scss';

type Props = {
  item: CartItemType,
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const {
    image,
    name,
    price,
  } = item.product;

  return (
    <li
      className="CartItem"
    >
      <div className="CartItem__main-info">
        <button
          type="button"
          aria-label="Delete"
          className="CartItem__clear"
          data-cy="cartDeleteButton"
          onClick={() => removeFromCart(item.id)}
        />
        <div className="CartItem__image-container">
          <img
            src={`${BASE_URL}/${image}`}
            alt={name}
            className="CartItem__image"
          />
        </div>
        <span className="CartItem__title">
          {name}
        </span>
      </div>

      <div className="CartItem__quan-and-price">
        <div className="CartItem__quantity-area">
          <button
            type="button"
            aria-label="Remove"
            className="button button--minus"
            disabled={item.quantity === 1}
            onClick={() => decreaseQuantity(item.id)}
          />
          <p className="CartItem__quantity">
            {item.quantity || 1}
          </p>
          <button
            type="button"
            aria-label="Add"
            className="button button--plus"
            onClick={() => increaseQuantity(item.id)}
          />
        </div>
        <span className="CartItem__price">
          &#36;
          {price}
        </span>
      </div>
    </li>
  );
};
