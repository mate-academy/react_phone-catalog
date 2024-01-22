import React, { memo } from 'react';

import './SearchField.scss';
import { useDebounce } from '../../../enhancers/hooks/debounce';
import { SearchParam } from '../../../definitions/enums/Router';
import { useSearchParams } from '../../../enhancers/hooks/searchParams';

const SubmitButton: React.FC = memo(() => (
  <button type="submit" className="search-field__button">
    <img src="./img/icons/search-icon.svg" alt="Search" />
  </button>
));

export const SearchField: React.FC = memo(() => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get(SearchParam.Search) || '';

  const [query, setQuery] = useDebounce(initialQuery,
    (newQuery) => searchParams.set(SearchParam.Search, newQuery));

  const handleFormSubmit = () => {
    searchParams.set(SearchParam.Search, query);
  };

  return (
    <form className="search-field" onSubmit={handleFormSubmit}>
      <input
        type="text"
        className="search-field__input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search in ..."
        size={1}
      />

      <SubmitButton />
    </form>
  );
});

