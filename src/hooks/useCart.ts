import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export const useCart = () => {
  const storeContext = useContext(CartContext);

  if (!storeContext) {
    throw new Error('useCart must be used inside a CartContextProvider');
  }

  return storeContext;
};
