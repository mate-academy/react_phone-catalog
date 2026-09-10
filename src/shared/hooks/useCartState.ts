import { useContext } from 'react';
import { CartStateContext } from '../contexts/CartContext';

export const useCartState = () => {
  const cartState = useContext(CartStateContext);

  if (!cartState) {
    throw new Error('useCartState must be used within a CartProvider');
  }

  return cartState;
};
