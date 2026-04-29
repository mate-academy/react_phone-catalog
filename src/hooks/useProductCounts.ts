import { useMemo } from 'react';
import { Product } from '../types';

interface ProductCounts {
  phones: number;
  tablets: number;
  accessories: number;
}

export const useProductCounts = (products: Product[]): ProductCounts => {
  return useMemo(
    () => ({
      phones: products.filter(p => p.category === 'phones').length,
      tablets: products.filter(p => p.category === 'tablets').length,
      accessories: products.filter(p => p.category === 'accessories').length,
    }),
    [products],
  );
};
