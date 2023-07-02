import React, { ReactNode, useContext } from 'react';
import useSearch from './useSearch';

export const SearchContext = React.createContext<ReturnType<typeof useSearch>>(
  {} as ReturnType<typeof useSearch>,
);

export const useSearchContext = () => useContext(SearchContext);

const SearchContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <SearchContext.Provider value={useSearch()}>
    {children}
  </SearchContext.Provider>
);

export default SearchContextProvider;
