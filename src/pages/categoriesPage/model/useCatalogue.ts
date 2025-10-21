import { Category, get } from '@shared/api';
import { useEffect } from 'react';
import { useUrlReducer } from './useUrlReducer';
import {
  CatalogueConf,
  CatalogueData,
  ItemsAmount,
  Order,
} from '@shared/api/types';
import { Status, useLoadItems } from '@features/index';
import { useNavigate } from 'react-router-dom';

type Props = {
  category: Category;
};

export const useCatalogue = ({ category }: Props) => {
  const [state, dispatch] = useUrlReducer();

  const apiConfig: CatalogueConf = {
    itemType: category,
    sort: state.sort || Order.NONE,
    perPage: state.perPage || ItemsAmount.ALL,
    page: +state.page || 1,
  };

  const navigate = useNavigate();

  const products = useLoadItems(() => get.catalogue(apiConfig));
  const length = useLoadItems(() => get.length(category));

  useEffect(() => {
    if (products.items === Status.ERROR) {
      navigate('/404');
    }
  }, [products.items]);

  useEffect(() => {
    products.loadItems();
  }, [category, state]);

  useEffect(() => {
    length.loadItems();
  }, [category]);

  const set = {
    order: (order: Order) => dispatch({ type: 'SET_SORT', payload: order }),
    amount: (amount: ItemsAmount) =>
      dispatch({ type: 'SET_PER_PAGE', payload: amount }),
    page: (page: number) => dispatch({ type: 'SET_PAGE', payload: page }),
  };

  return {
    data: products.items as CatalogueData | Status,
    length: length.items,
    set,
    currentOrder: apiConfig.sort,
    currentPerPage: apiConfig.perPage,
  };
};
