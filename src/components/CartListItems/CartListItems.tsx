import React, { useContext } from 'react';
import { CartItem } from '../CartItem';
import { CartContext } from '../CartProvider';

export const CartListItems: React.FC = () => {
  const { cart } = useContext(CartContext);

  return (
    <ul className="cartListItems">
      {cart.map(cartItem => (
        <li key={cartItem.id}>
          <CartItem cartItem={cartItem} />
        </li>
      ))}
    </ul>
  );
};
