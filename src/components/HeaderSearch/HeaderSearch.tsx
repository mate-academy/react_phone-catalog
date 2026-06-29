import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../Icon';
import { useDebounce } from '../../hooks/useDebounce';
import { useClickOutside } from '../../hooks/useClickOutside';
import { setParam } from '../../utils/setParam';
import { SEARCH_PARAMS } from '../../constants/Products/byCategory';
import style from './HeaderSearch.module.scss';
import cn from 'classnames';

const EMPTY_QUERY = '';
const SEARCH_DEBOUNCE_DELAY_MS = 1000;

export const HeaderSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(
    () => searchParams.get(SEARCH_PARAMS.query) || EMPTY_QUERY,
  );
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_DELAY_MS);
  const dropdownRef = useRef<HTMLInputElement | null>(null);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useClickOutside({
    ref: dropdownRef,
    isOpen,
    onClose: () => setIsOpen(false),
  });

  useEffect(() => {
    const currentParam = searchParams.get(SEARCH_PARAMS.query) || EMPTY_QUERY;

    if (currentParam === debouncedQuery) {
      return;
    }

    setSearchParams(prev =>
      setParam(prev, SEARCH_PARAMS.query, debouncedQuery),
    );
  }, [debouncedQuery, searchParams, setSearchParams]);

  return (
    <div className={style.search} ref={dropdownRef}>
      <div className={style.searchContent}>
        <button
          className={style.searchTrigger}
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Search"
        >
          <Icon name={isOpen ? 'close' : 'search'} />
        </button>
        <input
          type="search"
          id="search"
          className={cn(style.searchInput, {
            [style.searchInputOpen]: isOpen,
          })}
          value={query}
          onChange={handleQueryChange}
          placeholder="search"
        />
      </div>
    </div>
  );
};
