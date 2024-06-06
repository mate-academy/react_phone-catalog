/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';
import { SearchParams } from '../../types/Categories';
// import debounce from 'lodash.debounce';
import styles from './SearchField.module.css';

export const SearchField = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.Query) || '';
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [inputQuery, setInputQuery] = useState(query);

  const titleField = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (titleField.current && isSearchFocused) {
      titleField.current.focus();
    }
  }, [isSearchFocused]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    setInputQuery('');
  }, [pathname]);

  const debouncedSearch = (newQuery: string) => {
    setSearchParams(
      getSearchWith({ [SearchParams.Query]: newQuery || null }, searchParams),
    );
  };

  // const debouncedSearch = debounce((newQuery: string) => {
  //   setSearchParams(
  //     getSearchWith({ [SearchParams.Query]: newQuery || null }, searchParams),
  //   );
  // }, 1000);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setInputQuery('');
    setSearchParams(getSearchWith({ query: null }, searchParams));
  };

  return (
    <label
      htmlFor="search"
      className={classNames(styles.searchField, {
        [styles.focus]: isSearchFocused,
      })}
    >
      <input
        id="search"
        type="text"
        className={classNames(styles.searchFieldInput, {
          [styles.focus]: isSearchFocused,
        })}
        placeholder={`Search in ${pathname.slice(1)}...`}
        ref={titleField}
        autoComplete="off"
        value={inputQuery}
        onChange={handleQueryChange}
        onBlur={() => setIsSearchFocused(false)}
        onFocus={() => setIsSearchFocused(true)}
      />

      {!inputQuery ? (
        <button
          type="button"
          className={styles.searchFieldButton}
          aria-label="search"
          onClick={() => setIsSearchFocused(true)}
        >
          <div className="icon icon--search" />
        </button>
      ) : (
        <button
          data-cy="searchDelete"
          type="button"
          className={styles.searchFieldButton}
          aria-label="search"
          onClick={handleClearSearch}
        >
          <div className="icon icon--remove" />
        </button>
      )}
    </label>
  );
};
