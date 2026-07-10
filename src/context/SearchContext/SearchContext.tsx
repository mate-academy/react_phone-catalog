import { createContext } from 'react';

type SearchContextType = {
  search: boolean;
  setSearchVisible: (value: boolean) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);
