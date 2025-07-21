import { Category } from '@shared/types/APITypes';
import { useEffect, useMemo, useReducer } from 'react';
import { initialState, reducer } from './categoriesReducer';
import { sortFilter } from './filterHelpers';
import { ItemsAmount, Order } from '@shared/types/filterEnums';
import { fetchBaseProducts } from '@shared/api/fetch';

type Props = {
  category: Category;
};

export const useCategories = ({ category }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const load = async () => {
      const itemsArray = await fetchBaseProducts(category);

      if (itemsArray) {
        dispatch({ type: 'SET_ITEMS', payload: itemsArray });
      }
    };

    load();
  }, [category]);

  const visibleItems = useMemo(() => {
    const sorted = sortFilter(state.items, state.order);

    if (state.itemsOnPage === ItemsAmount.all) {
      return sorted;
    }

    const start = (state.page - 1) * state.itemsOnPage;

    return sorted.slice(start, start + (state.itemsOnPage as number));
  }, [state.itemsOnPage, state.items, state.order, state.page]);

  const totalPages = Math.ceil(
    state.items.length /
      (state.itemsOnPage === ItemsAmount.all
        ? state.items.length
        : state.itemsOnPage),
  );

  const setFilter = (value: Order) => {
    dispatch({ type: 'SET_ORDER', payload: value });
    dispatch({ type: 'SET_PAGE', payload: 1 });
  };

  const setAmount = (value: ItemsAmount) => {
    dispatch({ type: 'SET_ITEMS_ON_PAGE', payload: value });
  };

  const setPage = (value: number) => {
    dispatch({ type: 'SET_PAGE', payload: value });
  };

  return {
    visibleItems,
    setFilter,
    setAmount,
    setPage,
    totalPages,
    currentPage: state.page,
  };
};
