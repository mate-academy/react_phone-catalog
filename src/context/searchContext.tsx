import React, {
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

type SearchProps = {
  children: ReactNode;
};

type SearchContextValue = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = React.createContext({} as SearchContextValue);

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider: FC<SearchProps> = ({ children }) => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
