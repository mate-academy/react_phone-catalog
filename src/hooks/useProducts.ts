import { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};
