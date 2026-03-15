import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { SortOrder } from '../types/Sort';

export const useCategoryProducts = (products: Product[], category: string) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || SortOrder.Newest;

  const displayedProducts = useMemo(() => {
    const filtered = products.filter(p => p.category === category);

    switch (sort) {
      case SortOrder.Newest:
        return filtered.sort((a, b) => b.year - a.year);
      case SortOrder.Alphabetically:
        return filtered.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        );
      case SortOrder.Cheapest:
        return filtered.sort((a, b) => a.price - b.price);
      default:
        return filtered;
    }
  }, [products, category, sort]);

  return { displayedProducts, sort };
};
