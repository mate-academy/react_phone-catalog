import { useSearchParams } from 'react-router-dom';
import { Product } from '../Types/types';

export const useSortedProducts = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get('sort') || 'age';

  const sorted = [...products].sort((a, b) => {
    switch (sortType) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'age':
        return b.year - a.year;
      case 'price':
        return a.price - b.price;

      default:
        return 0;
    }
  });

  return { sorted, sortType, setSearchParams };
};
