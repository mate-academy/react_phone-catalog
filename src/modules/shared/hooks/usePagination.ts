import { useMemo } from 'react';
import useSortProductststs from './useSortProducts';
import { useLocation } from 'react-router-dom';

const usePagination = () => {
  const { sortProducts } = useSortProductststs();
  const { search } = useLocation();

  const createPageProducts = useMemo(() => {
    const arryOnPage = [];

    if (!search.includes('perPage')) {
      return [sortProducts];
    }

    const dividePage = search
      .split('&')
      .filter(item => item.includes('perPage'))[0]
      .split('=')[1];

    for (let i = 0; i < Math.ceil(sortProducts.length / +dividePage); i++) {
      arryOnPage[i] = sortProducts.slice(
        i * +dividePage,
        i * +dividePage + +dividePage,
      );
    }

    if (!search.includes('query')) {
      return arryOnPage;
    }

    // const findPage = search
    // .split('&')
    // .filter(item => item.includes('page'))[0]
    // .split('=')[1];

    // console.log(findPage)

    // const findSearch = search
    //   .split('&')
    //   .filter(item => item.includes('query'))[0]
    //   .split('=')[1]
    //   .split('+').join(' ')
    // console.log(findSearch.split('+').join(' '));

    // console.log(findSearch)

    return arryOnPage;
  }, [sortProducts, search]);

  return { createPageProducts };
};

export default usePagination;
