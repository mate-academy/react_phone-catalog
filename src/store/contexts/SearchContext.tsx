import { createContext } from 'react';
import { useSearchParams } from '../../enhancers/hooks/searchParams';
import { SearchParam } from '../../definitions/enums/Router';

export const SearchContext = createContext({
  search: '',
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();

  const value = {
    search: searchParams.get(SearchParam.Search) || '',
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
