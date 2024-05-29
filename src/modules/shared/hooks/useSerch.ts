import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import usePagination from './usePagination';

const useSearch = () => {
  const { createPageProducts } = usePagination()
  const { search } = useLocation();

  const serchProduct = useMemo(() => {

    const findPage = search
    .split('&')
    .find(item => item.includes('page'))
    ?.slice(5);

  const numberPage = findPage ? +findPage - 1 : 0;


  if (!search.includes('query')) {
    return createPageProducts[numberPage];
  }

  const findSearch = search
    .split('&')
    .filter(item => item.includes('query'))[0]
    .split('=')[1]
    .split('+').join(' ')

  const filterProduct = [...createPageProducts][numberPage]
    .filter(product => product.name
      .toLowerCase().includes(findSearch.toLowerCase()));


    return filterProduct;
  }, [createPageProducts, search]);

  return { serchProduct };
};

export default useSearch;
