import { useContext } from 'react';
import { ProductContext, ProductContextType } from './ProductContext';

export const useSafeProduct = (): ProductContextType | undefined => {
  return useContext(ProductContext);
};
