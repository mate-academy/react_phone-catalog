import { createContext } from 'react';

import { SearchContextType } from './types/SearchContextType';

export const SearchContext = createContext<SearchContextType>({
  searchParams: new URLSearchParams(),
  getSearchWith: () => '',
  setSearchParams: () => {},
  transformToSearchValue: () => '',
});
