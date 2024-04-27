import { useMemo } from 'react';
import useSortProductststs from './useSortProducts';
import { useLocation } from 'react-router-dom';

const usePagination = () => {
  const { sortProducts } = useSortProductststs();
  const { search } = useLocation();

  const createPageProducts = useMemo(() => {
    if (!search.includes('perPage')) {
      return [sortProducts];
    }

    const dividePage = search
      .split('&')
      .filter(item => item.includes('perPage'))[0]
      .slice(9);

    const arryOnPage = [];

    for (let i = 0; i < Math.ceil(sortProducts.length / +dividePage); i++) {
      arryOnPage[i] = sortProducts.slice(
        i * +dividePage,
        i * +dividePage + +dividePage,
      );
    }

    return arryOnPage;
  }, [sortProducts, search]);

  return { createPageProducts };
};

export default usePagination;
