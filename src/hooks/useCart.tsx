import { useContext } from 'react';
import { CartContext } from '../store/cart/CartProvider';

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within FavouritesProvider');
  }

  return context;
};
