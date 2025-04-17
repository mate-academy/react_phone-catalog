import { useMemo } from 'react';

import { Product } from 'shared/types/Product';

export function usePagedProducts(
  currentPage: number,
  isAllSelected: boolean,
  sortedProducts: Product[],
  perPage?: number,
): Product[] {
  return useMemo(() => {
    if (isAllSelected || !perPage) {
      return sortedProducts;
    }

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return sortedProducts.slice(startIndex, endIndex);
  }, [currentPage, isAllSelected, perPage, sortedProducts]);
}
