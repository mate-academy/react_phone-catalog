import { useCallback, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { TyChangeEvtInputElmt } from '../../types/General';
import {
  SearchParams, SearchParamsName, getSearchWith,
} from '../../helpers/searchHelper';

import './Search.scss';

export const Search = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery]
    = useState(searchParams.get(SearchParamsName.QUERY) || '');
  const page = location.pathname.slice(1, location.pathname.length);

  function setSearchWith(params: SearchParams) {
    setSearchParams(getSearchWith(searchParams, params));
  }

  const applyQuery = useCallback(debounce(setSearchWith, 1000), []);

  const handleQueryChange = (event: TyChangeEvtInputElmt) => {
    setQuery(event.target.value);
    applyQuery({ query: event.target.value.trim() || null });
  };

  const handleQueryClear = () => {
    setQuery('');
    setSearchWith({ query: null });
  };

  return (
    <div className="Search Search__container">
      <input
        type="input"
        className="Search__input"
        placeholder={`Search in ${page}...`}
        value={query}
        onChange={handleQueryChange}
      />

      {query ? (
        <button
          data-cy="searchDelete"
          type="button"
          aria-label="searchDelete"
          className="Search__button"
          onClick={handleQueryClear}
        >
          <i className="Search__icon icon--close" />
        </button>
      ) : (
        <span className="Search__icons">
          <i className="Search__icon icon--search" />
        </span>
      )}
    </div>
  );
};
