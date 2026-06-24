import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductPreview } from '../types/ProductPreview';

export function useSortedProducts(products: ProductPreview[]) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';

  const sortedProducts = useMemo(() => {
    const items = [...products];

    switch (sortBy) {
      case 'title':
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return items.sort((a, b) => a.price - b.price);
      case 'age':
      default:
        return items.sort((a, b) => b.year - a.year);
    }
  }, [products, sortBy]);

  return sortedProducts;
}
