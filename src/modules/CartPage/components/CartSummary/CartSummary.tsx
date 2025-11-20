import React from 'react';
import { useCart } from '../../../../contexts/CartContext';

export const CartSummary: React.FC = () => {
  const { totalAmount, totalQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    if (confirm('Checkout is not implemented yet. Do you want to clear the Cart?')) {
      clearCart();
    }
  };

  return (
    <div className="cart-summary">
      <p>Total items: {totalQuantity}</p>
      <p>Total amount: R$ {totalAmount.toFixed(2)}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};
