import { createContext, ReactNode } from 'react';
import { Category } from '@shared/types/APIReturnTypes';
import { useSearchParams } from 'react-router-dom';
import { UrlParams } from '../../types';
import { UrlParamValues } from '../../types/contextTypes';
import { createContextHook } from '@shared/helpers/contextProvider';

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

const CategoriesProvider = ({
  children,
  category,
}: CategoriesProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || '';
  const perPage = searchParams.get('perPage') || '';

  const setFilter = (param: UrlParams, value: UrlParamValues | string) => {
    setSearchParams(url => {
      {
        if (value === '') {
          url.delete(param);
        } else {
          url.set(param, value as string);
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

const useCategoriesContext = createContextHook(CategoriesContext);

export { CategoriesProvider, useCategoriesContext };
