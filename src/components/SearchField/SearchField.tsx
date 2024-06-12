import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import * as Popover from '@radix-ui/react-popover';
import { IoSearch } from 'react-icons/io5';

import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';
import { SearchParams } from '../../types/Categories';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './SearchField.module.css';

const PopoverDemo = () => {
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
    <Popover.Root>
      <Popover.Trigger className={styles.Trigger} asChild>
        <button className="IconButton" aria-label="Search">
          <IoSearch size={16} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.PopoverContent} sideOffset={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                  <img
                    src="img/icons/close-icon-hover.svg"
                    alt="Clear search icon"
                  />
                </button>
              )}
            </label>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverDemo;
