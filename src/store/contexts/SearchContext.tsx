import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { useSearchParams } from '../../enhancers/hooks/searchParams';
import { SearchParam } from '../../definitions/enums/Router';

interface SearchValue {
  searchIn: string,
  search: string | null,
  searchVisible: boolean,
  toggleSearch: (searchIn: string) => () => void,
}

export const SearchContext = createContext<SearchValue>({
  searchIn: '',
  search: '',
  searchVisible: false,
  toggleSearch: () => () => { },
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const [searchIn, setSearchIn] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = (searchIn: string) => {
    return () => {
      setSearchVisible(true);
      setSearchIn(searchIn);

      return () => {
        setSearchVisible(false);
        setSearchIn('');
      };
    };
  };

  const value = {
    searchIn,
    search: searchParams.get(SearchParam.Search),
    searchVisible,
    toggleSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export function useSearchHere(searchIn: string, deps: unknown[] = []) {
  const { toggleSearch } = useContext(SearchContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(toggleSearch(searchIn), deps);
}
