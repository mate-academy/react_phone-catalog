import { useMemo } from 'react';
import { Product } from '../types/ProductType';

type SortFn = (a: Product, b: Product) => number;

export const useSortedProducts = (
  products: Product[],
  sortFn: SortFn,
  count = 10,
) => {
  return useMemo(() => {
    return [...products].sort(sortFn).slice(0, count);
  }, [products, sortFn, count]);
};
