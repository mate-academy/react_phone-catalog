import { useContext } from 'react';
import { CartContext } from '../store/CartProvider';

export const useProductsCart = () => {
  return useContext(CartContext);
};
