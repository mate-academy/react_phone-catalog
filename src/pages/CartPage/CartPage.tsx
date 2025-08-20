import React from 'react';
import { useCart } from '../../context/CartContext/CartContext';
import { CartItem } from '../../components/CartItem';

import './CartPage.scss';
import { ButtonBack } from '../../components/ButtonBack';

export const CartPage: React.FC = () => {
  const { cart, totalQuantity, totalAmount, clearCart } = useCart();

  const handleCheckout = () => {
    if (
      confirm('Checkout is not implemented yet. Do you want to clear the Cart?')
    ) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <>
      <ButtonBack />
      <h1 className="cart__title">Cart</h1>
      <div className="cart__page">
        <div className="cart__items">
          {cart.map(item => (
            <CartItem
              key={item.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className="cart__checkout">
          <div className="cart__price-description">
            <p className="cart__checkout--price">${totalAmount}</p>
            <p className="cart__checkout--total">
              Total for {totalQuantity} items
            </p>
          </div>
          <button className="cart__checkout--button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};
