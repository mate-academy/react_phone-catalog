import './SearchBar.scss';
import React, { useCallback, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import { SearchParams } from '../../types/SearchParams';
import { getSearchWith } from '../../helpers/searchHelper';

export const SearchBar = () => {
  const { pathname } = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.Query) || '';
  const [inputQuery, setInputQuery] = useState(query);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      setSearchParams(
        getSearchWith({ [SearchParams.Query]: newQuery || null }, searchParams),
      );
    }, 1000), [searchParams, pathname],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleClear = () => {
    setInputQuery('');
    setSearchParams(
      getSearchWith(
        { [SearchParams.Query]: null }, searchParams,
      ),
    );
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={classNames('search-bar', {
        'search-bar--focus': isSearchFocused,
      })}
    >
      <input
        type="text"
        placeholder={`Search in ${pathname.slice(1)}...`}
        className="search-bar__input"
        value={inputQuery}
        onChange={handleQueryChange}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      />
      {!inputQuery
        ? <i className="icon icon--search" />
        : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <i
            className="icon icon--close"
            onClick={handleClear}
          />
        )}
    </label>
  );
};
