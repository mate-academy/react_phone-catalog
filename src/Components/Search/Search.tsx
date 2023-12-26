import { ChangeEvent, useCallback, useState } from 'react';
import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { getSearchWith } from '../../utils/searchHelper';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('query');
  const [query, setQuery] = useState(queryParam || '');

  const applyQuery = useCallback(
  debounce((newSearchParams: string) => {
    setSearchParams(newSearchParams);
  }, 1000),
  [searchParams],
);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);

    if (!newQuery) {
      applyQuery(getSearchWith(searchParams, { query: null }));
    } else {
      applyQuery(getSearchWith(searchParams, { query: newQuery }));
    }
  };

  return (
    <div className="search-container">
      <input
        className="search__input"
        placeholder="Search in phones..."
        value={query}
        onChange={handleQueryChange}
      />
    </div>
  );
};
