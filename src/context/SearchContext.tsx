// Контекст SearchContext.tsx

import React, {
  createContext,
  useContext,
  useState,
} from 'react';
import { Product } from '../types/Product';

interface SearchContextType {
  searchResults: Product[];
  setSearchResults: React.Dispatch<React.SetStateAction<(Product)[]>>;
  productType: string;
  setProductType: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{
  children: React.ReactNode,
}> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<(Product[])>([]);
  const [productType, setProductType] = useState<string>('all');

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        productType,
        setProductType,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};
