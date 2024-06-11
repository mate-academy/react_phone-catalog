import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { SearchParams } from '../../types/Categories';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';
import styles from './SearchField.module.css';
import { useDebounce } from '../../hooks/useDebounce';

export const SearchField = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.Query) || '';
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [inputQuery, setInputQuery] = useState(query);
  const titleField = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);
  const debouncedSearch = useDebounce(inputQuery, 500);

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

  useEffect(() => {
    setSearchParams(
      getSearchWith(
        { [SearchParams.Query]: debouncedSearch || null },
        searchParams,
      ),
    );
  }, [debouncedSearch, searchParams, setSearchParams]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setInputQuery('');
    setSearchParams(
      getSearchWith({ [SearchParams.Query]: null }, searchParams),
    );
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
          <img src="img/icons/search-icon.svg" alt="Search icon" />
        </button>
      ) : (
        <button
          data-cy="searchDelete"
          type="button"
          className={styles.searchFieldButton}
          aria-label="clear search"
          onClick={handleClearSearch}
        >
          <img src="img/icons/close-icon-hover.svg" alt="Clear search icon" />
        </button>
      )}
    </label>
  );
};
