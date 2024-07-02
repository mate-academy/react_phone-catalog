import { useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { getPreparedProducts } from '../helpers/getPreparedProducts';
import { useAppContext } from '../store/store';
import { SearchParamsType, getSearchWith } from '../helpers/searchHelper';

export const usePreparedProducts = () => {
  const {
    state: { products },
  } = useAppContext();
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const query = searchParams.get('query');
  const onPage = searchParams.get('onPage') || '8';
  const currentPage = +(searchParams.get('page') || '1');

  const preparedProducts = useMemo(() => {
    return getPreparedProducts(products, {
      category,
      sort,
      query,
      onPage,
      currentPage,
    });
  }, [products, category, sort, query, onPage, currentPage]);

  function setSearchWith(params: SearchParamsType) {
    setSearchParams(getSearchWith(searchParams, params));
  }

  return {
    preparedProducts,
    setSearchWith,
    params: {
      category,
      sort,
      query,
      onPage,
      currentPage,
    },
  };
};
