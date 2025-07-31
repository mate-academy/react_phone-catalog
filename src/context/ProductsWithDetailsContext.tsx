import { createContext, useContext } from 'react';
import type { ProductWithDetails } from '../types/ProductWithDetails';

export const ProductsWithDetailsContext = createContext<ProductWithDetails[]>(
  [],
);
//
export const useProductsWithDetails = () =>
  useContext(ProductsWithDetailsContext);
