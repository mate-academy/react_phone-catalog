import { useMemo } from 'react';
import { Product } from '../types/Product';
import { SortBy } from '../enums/SortBy';

export function useFilteredProducts(
  products: Product[],
  category: string,
  query: string,
  sortBy: string,
): Product[] {
  return useMemo(() => {
    const result = products.filter(
      p =>
        (category === '' || p.category === category) &&
        (query === '' || p.name.toLowerCase().includes(query.toLowerCase())),
    );

    switch (sortBy) {
      case SortBy.Alpha:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortBy.Cheap:
        result.sort((a, b) => a.price - b.price);
        break;
      case SortBy.Newest:
        result.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    return result;
  }, [products, category, query, sortBy]);
}
