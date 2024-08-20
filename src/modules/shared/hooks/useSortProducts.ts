import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useFilterProducts from './useFilterProducts';

const useSortProductststs = () => {
  const { search } = useLocation();
  const { filterProduct } = useFilterProducts();

  const sortProducts = useMemo(() => {
    if (!search.includes('sort')) {
      return filterProduct;
    }

    const divideSearch = search
      .split('&')
      .filter(item => item.includes('sort'))[0]
      .split('=')[1];

    switch (divideSearch) {
      case 'age':
        return [...filterProduct].sort((a, b) => b.year - a.year);

      case 'title':
        return [...filterProduct].sort((a, b) => a.name.localeCompare(b.name));

      case 'price':
        return [...filterProduct].sort((a, b) => a.price - b.price);

      default:
        return filterProduct;
    }
  }, [search, filterProduct]);

  return { sortProducts };
};

export default useSortProductststs;
