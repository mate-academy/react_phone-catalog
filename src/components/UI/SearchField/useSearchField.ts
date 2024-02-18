import { useEffect } from 'react';
import { Category } from '../../../api/products/server/types';
import { PAGE, SearchParam } from '../../../definitions/enums/Router';
import { useAppLocation } from '../../../enhancers/hooks/appLocation';
import { SearchFieldProps } from './SearchField';
import { useDebounce } from '../../../enhancers/hooks/debounce';
import { useSearchParams } from '../../../enhancers/hooks/searchParams';

type SearchContextReturn = [boolean, string];

const useSearchContext = (): SearchContextReturn => {
  const { pathname } = useAppLocation();
  const normPath = pathname.slice(1);

  if (Object.values(Category).includes(normPath as Category)) {
    return [true, normPath];
  }

  switch (pathname.slice(1)) {
    case PAGE.Favorites: return [true, PAGE.Favorites];
    default: return [false, ''];
  }
};

export function useSearchField({ className }: SearchFieldProps) {
  const [searchVisible, searchIn] = useSearchContext();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get(SearchParam.Search) || '';
  const [query, setQuery] = useDebounce(initialQuery,
    (newQuery) => searchParams.set(SearchParam.Search, newQuery));

  const handleFormSubmit = () => {
    searchParams.set(SearchParam.Search, query);
  };

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const classes = [
    'search-field',
    `${className || ''}`,
    searchVisible ? '' : 'search-field--hidden',
  ].join(' ');

  return {
    classes,
    handleFormSubmit,
    query,
    setQuery,
    searchIn,
  };
}
