import { useContext } from 'react';
import {
  ProductContext,
  ProductContextType,
} from '../../ProductDetailsPage/hooks/ProductContext';

export const useSafeProduct = (): ProductContextType | undefined => {
  return useContext(ProductContext);
};
