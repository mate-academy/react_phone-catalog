import { useContext } from 'react';
import { ProductsContext } from './ProductsContext';

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
