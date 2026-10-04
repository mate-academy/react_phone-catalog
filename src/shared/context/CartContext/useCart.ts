import { useContext } from 'react';
import { CartContext } from './CartContext';

export const useCart = () => {
  return useContext(CartContext);
};
