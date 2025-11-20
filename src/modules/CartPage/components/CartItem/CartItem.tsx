import React from 'react';
import { CartItemType } from '../../../../contexts/CartContext';
import { useCart } from '../../../../contexts/CartContext';

type Props = { item: CartItemType };

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, changeQuantity } = useCart();

  return (
    <div className="cart-item">
      <img src={item.product.image || 'https://via.placeholder.com/80'} alt={item.product.name} />
      <div className="info">
        <p>{item.product.name}</p>
        <p>
          R$ {(item.product.price - item.product.discount).toFixed(2)}
        </p>
        <div className="quantity">
          <button onClick={() => changeQuantity(item.id, -1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => changeQuantity(item.id, 1)}>+</button>
        </div>
      </div>
      <button onClick={() => removeFromCart(item.id)}>x</button>
    </div>
  );
};
