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
      phones: products.filter(product => product.category === 'phones').length,
      tablets: products.filter(product => product.category === 'tablets')
        .length,
      accessories: products.filter(
        product => product.category === 'accessories',
      ).length,
    }),
    [products],
  );
};
