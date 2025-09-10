import { Product } from '../types/Product';

export type SortBy = 'Newest' | 'Low to High' | 'High to Low';

export const DEFAULT_SORT: SortBy = 'Newest';

export const getSortBy = (searchParams: URLSearchParams): SortBy => {
  return (searchParams.get('sort') as SortBy) || DEFAULT_SORT;
};

export const sortProducts = (
  products: Product[],
  sortBy: SortBy,
): Product[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'Low to High':
        return (a.price ?? a.fullPrice) - (b.price ?? b.fullPrice);
      case 'High to Low':
        return (b.price ?? b.fullPrice) - (a.price ?? a.fullPrice);
      case 'Newest':
      default:
        return b.year - a.year;
    }
  });
};
