import { useMemo } from 'react';
import { SORT } from '../types/Sort';

export const useSortAndSearch = (
  products,
  sort,
  searchQuery,
) => {
  return useMemo(() => {
    return ([...products]
      .sort((a, b) => {
        switch (sort) {
          case SORT.Newest:
            return (b.year - a.year);
          case SORT.Alphabetically:
            return (a.name.localeCompare(b.name));
          case SORT.Cheapest:
            return (a.price - b.price);
          default:
            return 0;
        }
      })
      .filter((product) => product.name?.toLowerCase()
        .includes(searchQuery.toLowerCase())
      || product.screen?.includes(searchQuery)
      || product.capacity?.includes(searchQuery)
      || product.ram?.includes(searchQuery))
    );
  }, [products, sort, searchQuery]);
};
