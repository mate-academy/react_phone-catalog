import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchParams';
import './SearchBar.scss';

export const SearchBar = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setQuery('');
    setSearchParams(getSearchWith({ query: null }, searchParams));
  }, [pathname]);

  const debouncedSearch = useCallback(debounce(setSearchParams, 500), []);

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(e.target.value);
    debouncedSearch(getSearchWith({
      query: e.target.value || null,
    }, searchParams));
  };

  const handleQueryClear = () => {
    setQuery('');
    setSearchParams(
      getSearchWith({ query: null }, searchParams),
    );
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        name="search"
        placeholder={`Search in ${pathname.replace(/\//g, '')}`}
        className="search-bar__input"
        value={query}
        autoComplete="off"
        onChange={handleQueryChange}
      />

      {query ? (
        <button
          type="button"
          className="search-bar__button"
          data-cy="searchDelete"
          onClick={handleQueryClear}
        >
          <span
            className="search-bar__button-icon search-bar__button-icon--close"
          />
        </button>
      )
        : (
          <button
            type="button"
            className="search-bar__button"
          >
            <span
              className="
              search-bar__button-icon search-bar__button-icon--search"
            />
          </button>
        )}
    </div>
  );
};
