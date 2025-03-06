import { createContext } from 'react';

import { DSContextType } from './types/DSContextType';

export const DSContext = createContext<DSContextType>({
  pageNumber: 0,
  PAGE_PARAM: '',
  searchPageParam: '',
  setPageNumber: () => {},

  SORT_TITLE: '',
  sortBy: '',
  searchSortParam: '',
  SORT_PARAM: '',
  setSortBy: () => {},

  PER_PAGE_TITLE: '',
  perPage: '',
  searchPerPageParam: '',
  PER_PAGE_PARAM: '',
  setPerPage: () => {},
});
