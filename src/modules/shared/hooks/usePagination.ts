import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useSearch from './useSerch';

const usePagination = () => {
  const { serchProduct } = useSearch();
  const { search } = useLocation();

  const createPageProducts = useMemo(() => {
    const arryOnPage = [];

    if (!search.includes('perPage')) {
      return [serchProduct];
    }

    if (serchProduct.length === 0) {
      return [[]];
    }

    const dividePage = search
      .split('&')
      .filter(item => item.includes('perPage'))[0]
      .split('=')[1];

    for (let i = 0; i < Math.ceil(serchProduct.length / +dividePage); i++) {
      arryOnPage[i] = serchProduct.slice(
        i * +dividePage,
        i * +dividePage + +dividePage,
      );
    }

    if (!search.includes('query')) {
      return arryOnPage;
    }

    return arryOnPage;
  }, [serchProduct, search]);

  return { createPageProducts };
};

export default usePagination;
