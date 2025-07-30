import { createContext, useContext, ReactNode } from 'react';
import { Category } from '@shared/types/APITypes';
import { useSearchParams } from 'react-router-dom';
import { UrlParams } from '../../types';

type CategoriesContextType = {
  category: Category;
  sort: string;
  page: string;
  perPage: string;
  setFilter: (param: UrlParams, value: string) => void;
};

const CategoriesContext = createContext<CategoriesContextType | null>(null);

interface CategoriesProviderProps {
  children: ReactNode;
  category: Category;
}

export const CategoriesProvider = ({
  children,
  category,
}: CategoriesProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || '';
  const perPage = searchParams.get('perPage') || '';

  const setFilter = (param: UrlParams, value: string) => {
    setSearchParams(url => {
      {
        if (value === '') {
          url.delete(param);
        } else {
          url.set(param, value);
        }

        return url;
      }
    });
  };

  const value = {
    category,
    sort,
    page,
    perPage,
    setFilter,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('useStoreContext must be used within StoreProvider');
  }

  return context;
};
