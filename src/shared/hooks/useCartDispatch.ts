import { useContext } from 'react';
import { CartDispatchContext } from '../contexts/CartContext';

export const useCartDispatch = () => {
  const cartDispatch = useContext(CartDispatchContext);

  if (!cartDispatch) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }

  return cartDispatch;
};
