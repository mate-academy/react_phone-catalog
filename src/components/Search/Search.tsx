import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import './Search.scss';
import { useLocation, useSearchParams, Link } from 'react-router-dom';

import { ReactComponent as SearchIcon } from '../../images/icons/search.svg';
import { ReactComponent as CloseIcon } from '../../images/icons/close.svg';
import { getSearchWith } from '../../helpers/searchHelper';
import { defaultSearchParams } from '../../data/defaultSearchParams';

export const Search: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || defaultSearchParams.query;

  const [localQuery, setLocalQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const isQuery = localQuery.length > 0;

  const applySearchParams = useCallback(
    debounce(setSearchParams, 1000),
    [],
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: e.target.value || null,
      page: null,
    });

    setLocalQuery(e.target.value);
    applySearchParams(search);
  };

  function searchReset() {
    return (
      {
        search: getSearchWith(
          searchParams, {
            query: null,
          },
        ),
      }
    );
  }

  return (
    <div className="search">
      <form
        className="search__form"
        action="#/"
        method="get"
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          className={cn('search__content',
            { 'search__content--active': isSearchActive })}
        >
          <input
            type="search"
            className={cn('search__input',
              { 'search__input--active': isSearchActive })}
            name="search"
            placeholder={`Search in ${pathname.slice(1)}...`}
            onChange={handleQueryChange}
            value={localQuery}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
          />
          <div
            className="search__icon"
            data-cy="searchDelete"
          >
            {isQuery
              ? (
                <Link to={searchReset()}>
                  <CloseIcon />
                </Link>
              )
              : <SearchIcon />}
          </div>
        </label>
      </form>
    </div>
  );
};
