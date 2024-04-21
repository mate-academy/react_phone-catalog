import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { PRODUCT_PAGES } from '../../helpers/constants';

interface QuerySearch {
  isProductPage: boolean;
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: (arg: boolean) => void;
  onBlur: () => void;
  onSearchDelete: () => void;
  appliedQuery: string;
  setAppliedQuery: (arg: string) => void;
  applyQuery: (arg: string) => void;
}

export const QuerySearchContext = createContext<QuerySearch>({
  isProductPage: false,
  isSearchBarOpen: false,
  setIsSearchBarOpen: () => {},
  onBlur: () => {},
  onSearchDelete: () => {},
  appliedQuery: '',
  setAppliedQuery: () => {},
  applyQuery: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const QuerySearchContextProvider: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [appliedQuery, setAppliedQuery] = useState(query);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  useEffect(() => {
    applyQuery(query);
  }, [query, applyQuery]);

  const isProductPage = useMemo(
    () => PRODUCT_PAGES.includes(pathname),
    [pathname],
  );
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(!!query);

  useEffect(() => {
    if (!isProductPage && isSearchBarOpen) {
      setIsSearchBarOpen(false);
    }
  }, [isProductPage, isSearchBarOpen]);

  const onBlur = useCallback(() => {
    if (!query) {
      setIsSearchBarOpen(false);
    }
  }, [query]);

  const onSearchDelete = useCallback(
    () => {
      setIsSearchBarOpen(false);
    },
    [setIsSearchBarOpen],
  );

  return (
    <QuerySearchContext.Provider value={{
      isProductPage,
      isSearchBarOpen,
      setIsSearchBarOpen,
      onBlur,
      onSearchDelete,
      appliedQuery,
      setAppliedQuery,
      applyQuery,
      // onQueryChange,
    }}
    >
      {children}
    </QuerySearchContext.Provider>
  );
};
