import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Params } from '../../types/Params';

import { getSearchWith } from '../../utils/getSearchWith';
import { normalizeSpaces } from '../../utils/normalizeSpaces';

import './Search.scss';

import searchIcon from '../../images/icons/Search_icon.svg';

type Props = {
  category: string;
};

export const Search: React.FC<Props> = memo(({ category }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prevQuery, setPrevQuery] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const setSearchWith = useCallback(
    (params: Params) => {
      const search = getSearchWith(params, searchParams);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    const normalizedQuery = normalizeSpaces(searchQuery);

    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    if (normalizedQuery.length > 1 && normalizedQuery !== prevQuery) {
      timerId.current = setTimeout(() => {
        setSearchWith({
          query: normalizedQuery,
        });
        setPrevQuery(normalizedQuery);
      }, 1000);
    } else if (normalizedQuery.length === 0) {
      setSearchWith({ query: null });
      setPrevQuery(null);
    }

    return () => {};
  }, [searchQuery, setSearchWith, prevQuery]);

  return (
    <div className="Search">
      <input
        ref={inputRef}
        id="search"
        type="search"
        placeholder={`Search in ${category}...`}
        className="Search__input"
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      <span className="Search__icon">
        {searchQuery ? (
          <button
            type="button"
            className="Search__button"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            data-cy="searchDelete"
          >
            <i className="fas fa-xmark Search__xmark" />
          </button>
        ) : (
          <button
            type="button"
            className="Search__button Search__button--search"
            onClick={handleSearchClick}
          >
            <img src={searchIcon} alt="Search" className="Search__searchIcon" />
          </button>
        )}
      </span>
    </div>
  );
});
