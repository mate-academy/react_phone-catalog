import React, { useState } from 'react';
import { SearchContext } from './SearchContext';

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState(false);
  const setSearchVisible = (value: boolean) => setSearch(value);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearchVisible,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
