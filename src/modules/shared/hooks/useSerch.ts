import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useSortProductststs from './useSortProducts';

const useSearch = () => {
  const { sortProducts } = useSortProductststs();
  const { search } = useLocation();

  const serchProduct = useMemo(() => {
    if (!search.includes('query')) {
      return sortProducts;
    }

    const findSearch = search
      .split('&')
      .filter(item => item.includes('query'))[0]
      .split('=')[1]
      .split('+')
      .join(' ');

    const filterProduct = [...sortProducts].filter(product =>
      product.name.toLowerCase().includes(findSearch.toLowerCase()),
    );

    return filterProduct;
  }, [sortProducts, search]);

  return { serchProduct };
};

export default useSearch;
