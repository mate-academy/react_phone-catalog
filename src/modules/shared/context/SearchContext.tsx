import React, { createContext, useCallback, useContext, useState } from 'react';

interface SearchContextValue {
  isActive: boolean;
  query: string;
  placeholder: string;
  setQuery: (value: string) => void;
  registerSearch: (
    placeholder: string,
    query: string,
    onChange: (value: string) => void,
  ) => void;
  unregisterSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

type OnChangeCallback = ((value: string) => void) | null;

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQueryState] = useState('');
  const [placeholder, setPlaceholder] = useState('Search');
  const [onChangeCb, setOnChangeCb] = useState<OnChangeCallback>(null);

  const registerSearch = useCallback(
    (ph: string, initialQuery: string, onChange: (value: string) => void) => {
      setPlaceholder(ph);
      setQueryState(initialQuery);
      setOnChangeCb(() => onChange);
      setIsActive(true);
    },
    [],
  );

  const unregisterSearch = useCallback(() => {
    setIsActive(false);
    setOnChangeCb(null);
    setQueryState('');
  }, []);

  const setQuery = (value: string) => {
    setQueryState(value);
    onChangeCb?.(value);
  };

  return (
    <SearchContext.Provider
      value={{
        isActive,
        query,
        placeholder,
        setQuery,
        registerSearch,
        unregisterSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }

  return context;
}

export function usePageSearch(
  active: boolean,
  placeholder: string,
  query: string,
  onChange: (value: string) => void,
) {
  const { registerSearch, unregisterSearch } = useSearchContext();

  React.useEffect(() => {
    if (!active) {
      return;
    }

    registerSearch(placeholder, query, onChange);

    return () => unregisterSearch();
  }, [active, placeholder, query, onChange, registerSearch, unregisterSearch]);
}
