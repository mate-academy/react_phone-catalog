import { useContext } from 'react';
import { ProductsContext } from '../store/ProductsContext';

export const useProducts = () => {
  const productsContext = useContext(ProductsContext);

  if (!productsContext) {
    throw new Error(
      'useProducts must be used inside a ProductsContextProvider',
    );
  }

  return productsContext;
};
