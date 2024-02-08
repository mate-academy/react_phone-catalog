import React, { memo, useEffect } from 'react';

import './SearchField.scss';
import { useDebounce } from '../../../enhancers/hooks/debounce';
import { SearchParam } from '../../../definitions/enums/Router';
import { useSearchParams } from '../../../enhancers/hooks/searchParams';
import { useLocation } from 'react-router-dom';

const SubmitButton: React.FC = memo(() => (
  <button type="submit" className="search-field__button">
    <img src="./img/icons/search-icon.svg" alt="Search" />
  </button>
));

interface Props {
  searchIn?: string,
}

export const SearchField: React.FC<Props> = memo(({ searchIn }) => {
  const { pathname } = useLocation();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get(SearchParam.Search) || '';

  const [query, setQuery] = useDebounce(initialQuery,
    (newQuery) => searchParams.set(SearchParam.Search, newQuery));

  const handleFormSubmit = () => {
    searchParams.set(SearchParam.Search, query);
  };

  useEffect(() => {
    setQuery(initialQuery);
  }, [pathname]);

  return (
    <form className="search-field" onSubmit={handleFormSubmit}>
      <input
        type="text"
        className="search-field__input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={`Search in ${searchIn || ''}...`}
        size={1}
      />

      <SubmitButton />
    </form>
  );
});

