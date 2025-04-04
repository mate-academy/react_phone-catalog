import { useContext } from 'react';
import { CartContext, CartContextProps } from './CartContext';

export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};
