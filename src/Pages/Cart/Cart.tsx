import React from 'react';
import { useCartContext } from '../../../src/CartContext/useCartContext';
import { CartItem } from './CartItem';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCartContext();

  // Calculate the total price of all items in the cart
  const total = cart.reduce(
    (acc, { item, quantity }) => acc + item.priceDiscount * quantity,
    0,
  );

  return (
    <div>
      <h2 className="cart_title">Cart</h2>
      <div className="cart-container">
        <div className="cart-item-list">
          {cart.map(({ item, quantity }) => (
            <CartItem
              key={item.id}
              item={item}
              quantity={quantity}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>
        <div className="cart-total">
          <h3 className="total_title">
            Total:
            <br />
            {total.toFixed(2)}
          </h3>
          <div className="cart-total__clear">
            <button
              onClick={clearCart}
              className="checkout-button"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
