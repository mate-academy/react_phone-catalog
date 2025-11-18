import { PerPage, SortOrder } from '@shared/api';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUrlReducer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(
    () => ({
      sort: (searchParams.get('sort') as SortOrder) || '',
      perPage: (searchParams.get('perPage') as PerPage) || '',
      page: searchParams.get('page') || '',
    }),
    [searchParams],
  );

  type FilterAction =
    | { type: 'SET_PAGE'; payload: number }
    | { type: 'SET_SORT'; payload: SortOrder }
    | { type: 'SET_PER_PAGE'; payload: PerPage }
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
          if (action.payload === SortOrder.NONE) {
            params.delete('sort');
          } else {
            params.delete('page');
            params.set('sort', action.payload);
          }

          return params;

        case 'SET_PER_PAGE':
          if (action.payload === PerPage.ALL) {
            params.delete('perPage');
          } else {
            params.delete('page');
            params.set('perPage', action.payload);
          }

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
