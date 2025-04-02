import React from 'react';
import { useCartContext } from '../../../src/CartContext/CartContext';
import { CartItem } from './CartItem';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCartContext();

  // Calculate the total price of all items in the cart
  const total = cart.reduce(
    (acc, { item, quantity }) => acc + item.priceDiscount * quantity,
    0,
  );

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cart.map(({ item, quantity }) => (
        <CartItem
          key={item.id}
          item={item}
          quantity={quantity}
          onRemove={() => removeFromCart(item.id)}
        />
      ))}
      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={clearCart} className="checkout-button">
          Clear
        </button>
      </div>
    </div>
  );
};
