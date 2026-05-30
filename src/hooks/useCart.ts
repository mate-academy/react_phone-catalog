import { useContext } from 'react';

import { CartContext } from '../context';

export const useCart = () => {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error('CartProvider is missing');
  }

  return value;
};
