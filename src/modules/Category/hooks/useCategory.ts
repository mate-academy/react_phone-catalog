import { useMemo } from 'react';

import { getInRange } from '../../../utils/getInRange';
import { filterProducts } from '../../../utils/filterProducts';
import { Product } from '../../../types';
import { sortProducts } from '../utils/sortProducts';
import { useSortQuery } from './useSortQuery';
import { useTakeQuery } from './useTakeQuery';
import { useSearchQuery } from './useSearchQuery';
import { usePageQuery } from './usePageQuery';

export const useCategory = (products: Product[]) => {
  const [sortOption] = useSortQuery();
  const [takeOption] = useTakeQuery();
  const [searchQuery] = useSearchQuery();
  const [pageQuery] = usePageQuery();

  const filteredProducts = useMemo(
    () => filterProducts(products, searchQuery),
    [products, searchQuery],
  );

  const take = Math.min(+takeOption.value, filteredProducts.length);
  const numberOfPages = Math.ceil(filteredProducts.length / take);
  const page = getInRange(pageQuery, 1, numberOfPages);

  const preparedProducts = sortProducts(
    filteredProducts,
    sortOption.value,
  ).slice((page - 1) * take, page * take);

  return {
    preparedProducts,
    filteredProducts,
    numberOfPages,
  };
};
