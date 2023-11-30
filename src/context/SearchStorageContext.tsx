import { createContext } from 'react';

type SearchType = {
  searchValue: string;
  onInputChange: ((value: string) => void) | null;
  handleInputQuery: (value: string) => void;
};

export const SearchStorageContext = createContext<SearchType>({
  searchValue: '',
  onInputChange: null,
  handleInputQuery: () => {},
});
