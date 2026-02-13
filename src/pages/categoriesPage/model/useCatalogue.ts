import { useUrlReducer } from './useUrlReducer';
import { CatalogueBody } from '@shared/api/types/bodies.types';
import { Category } from '@shared/types';
import { get, PerPage, SortOrder } from '@shared/api';
import { useLoadItems } from '@features/useUILoader';
import { useEffect } from 'react';

type Props = {
  category: Category;
};

export const useCatalogue = ({ category }: Props) => {
  const [state, dispatch] = useUrlReducer();

  const apiConfig: CatalogueBody = {
    category: category,
    sort: state.sort || SortOrder.NONE,
    perPage: state.perPage || PerPage.ALL,
    page: +state.page || 1,
  };

  const products = useLoadItems(() => get.catalogue(apiConfig));
  const length = useLoadItems(() => get.length(category));

  const set = {
    order: (order: SortOrder) => dispatch({ type: 'SET_SORT', payload: order }),
    amount: (amount: PerPage) =>
      dispatch({ type: 'SET_PER_PAGE', payload: amount }),
    page: (page: number) => dispatch({ type: 'SET_PAGE', payload: page }),
  };

  useEffect(() => {
    products.reload();
    length.reload();
  }, [category, state.sort, state.perPage, state.page]);

  return {
    products: products.data,
    length: length.data,
    set,
    currentOrder: apiConfig.sort,
    currentPerPage: apiConfig.perPage,
  };
};
