import { useSearchParams } from 'react-router-dom';

import { SearchContext } from '../SearchContext';
import { SearchContextType } from '../types/SearchContextType';
import { SearchParams } from '../types/SearchParams';

interface Props {
  children: React.ReactNode;
}

export const SearchContextProvider: React.FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const transformToSearchValue = (value: string) => {
    return value.toLowerCase().replace(' ', '-');
  };

  const getSearchWith = (paramsToUpdate: SearchParams): string => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(part => {
          newParams.append(key, part);
        });
      } else {
        newParams.set(key, value);
      }
    });

    return newParams.toString();
  };

  const searchContextValue: SearchContextType = {
    searchParams,
    setSearchParams,
    getSearchWith,
    transformToSearchValue,
  };

  return (
    <SearchContext.Provider value={searchContextValue}>
      {children}
    </SearchContext.Provider>
  );
};
