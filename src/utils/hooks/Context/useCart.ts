import { useContext } from 'react';
import { CartContext } from '../../../store/CartContext';

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCartContext must be used within CartProvider');
  }

  return ctx;
};
