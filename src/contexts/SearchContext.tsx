import { createContext, useContext, useState, ReactNode } from 'react';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  searchPlaceholder: string;
  setSearchPlaceholder: (placeholder: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const SearchProvider = ({ children }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search...');

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        showSearch,
        setShowSearch,
        searchPlaceholder,
        setSearchPlaceholder,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};
