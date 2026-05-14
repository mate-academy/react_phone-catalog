import './CartItem.scss';
import React from 'react';
import { useCart, CartItem as CartItemType } from '../../context/CartContext';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, changeQuantity } = useCart();

  const imagePath = item.image.startsWith('/')
    ? item.image.slice(1)
    : item.image;

  return (
    <div className="cart-item">
      <div className="cart-item__info">
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => removeFromCart(item.id)}
        >
          ×
        </button>

        <img src={imagePath} alt={item.name} className="cart-item__image" />

        <p className="cart-item__name">{item.name}</p>
      </div>

      <div className="cart-item__actions">
        <div className="cart-item__quantity">
          <button
            type="button"
            className="cart-item__quantity-btn"
            disabled={item.quantity === 1}
            onClick={() => changeQuantity(item.id, -1)}
          >
            -
          </button>
          <span className="cart-item__quantity-val">{item.quantity}</span>
          <button
            type="button"
            className="cart-item__quantity-btn"
            onClick={() => changeQuantity(item.id, 1)}
          >
            +
          </button>
        </div>

        <p className="cart-item__price">{`$${item.price * item.quantity}`}</p>
      </div>
    </div>
  );
};
