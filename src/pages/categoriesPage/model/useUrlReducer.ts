import { ItemsAmount, Order } from '@shared/api';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUrlReducer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(
    () => ({
      sort: (searchParams.get('sort') as Order) || '',
      perPage: (searchParams.get('perPage') as ItemsAmount) || '',
      page: searchParams.get('page') || '',
    }),
    [searchParams],
  );

  type FilterAction =
    | { type: 'SET_PAGE'; payload: number }
    | { type: 'SET_SORT'; payload: Order }
    | { type: 'SET_PER_PAGE'; payload: ItemsAmount }
    | { type: 'RESET_FILTERS' };

  const dispatch = (action: FilterAction) => {
    setSearchParams(params => {
      switch (action.type) {
        case 'SET_PAGE':
          if (action.payload === 1) {
            params.delete('page');
          } else {
            params.set('page', action.payload.toString());
          }

          return params;
        case 'SET_SORT':
          if (action.payload === Order.NONE) {
            params.delete('sort');
          } else {
            params.set('sort', action.payload);
          }

          dispatch({ type: 'SET_PAGE', payload: 1 });

          return params;

        case 'SET_PER_PAGE':
          if (action.payload === ItemsAmount.ALL) {
            params.delete('perPage');
          } else {
            params.set('perPage', action.payload);
          }

          dispatch({ type: 'SET_PAGE', payload: 1 });

          return params;

        case 'RESET_FILTERS':
          params.delete('sort');
          params.delete('perPage');
          params.delete('page');

          return params;
      }
    });
  };

  return [state, dispatch] as const;
};
