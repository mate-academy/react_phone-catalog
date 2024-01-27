import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

import { TyChangeEvtInputElmt } from '../../types/General';
import {
  SearchParams, SearchParamsName, getSearchWith,
} from '../../helpers/searchHelper';

import './Search.scss';
/* eslint no-console: "warn" */
export const Search = React.memo(
  () => {
    console.info('render');
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery]
    = useState(searchParams.get(SearchParamsName.QUERY) || '');
    const page = location.pathname.slice(1, location.pathname.length);

    const setSearchWith = (params: SearchParams) => {
      setSearchParams(getSearchWith(searchParams, params));
    };

    const applyQuery = useCallback(
      debounce(setSearchWith, 1000),
      [location.pathname],
    );// bag correction

    useEffect(() => { // search when switch on other page
      setSearchWith({ [SearchParamsName.QUERY]: query.trim() || null });
    }, [location.pathname]);

    const handleQueryChange = (event: TyChangeEvtInputElmt) => {
      setQuery(event.target.value);
      applyQuery({
        [SearchParamsName.QUERY]:
        event.target.value.trim() || null,
      });
    };

    const handleQueryClear = () => {
      setQuery('');
      setSearchWith({ [SearchParamsName.QUERY]: null });
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
            <i className="icon icon--close" />
          </button>
        ) : (
          <span className="Search__icons">
            <i className="icon icon--search" />
          </span>
        )}
      </div>
    );
  },
  isEqual,
);
