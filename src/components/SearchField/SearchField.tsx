import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './SearchField.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { getSearchWith } from '../../helpers/SearchHelper';

export const SearchField: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query' || '');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [appliedQuery, setAppliedQuery] = useState<string>(query || '');
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

    setAppliedQuery('');
  }, [pathname]);

  const applyQuery = debounce((newQuery: string) => {
    setSearchParams(
      getSearchWith({
        query: newQuery || null,
      }, searchParams),
    );
  }, 1000);

  const handleQueruChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppliedQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const clearSearch = () => {
    setAppliedQuery('');
    setSearchParams(
      getSearchWith({ query: null }, searchParams),
    );
  };

  return (
    <label
      htmlFor="search"
      className="searchField"
    >
      <input
        type="text"
        id="search"
        className={classNames('searchField__input', { focus: isSearchFocused })}
        placeholder={`Search in ${pathname.slice(1)} ...`}
        autoComplete="off"
        ref={titleField}
        value={appliedQuery}
        onChange={handleQueruChange}
        onBlur={() => setIsSearchFocused(false)}
        onFocus={() => setIsSearchFocused(true)}
      />

      {!appliedQuery ? (
        <button
          type="button"
          className="searchField__btn"
          aria-label="search"
          onClick={() => setIsSearchFocused(true)}
        >
          <div className="icon icon--search" />

        </button>
      ) : (
        <button
          type="button"
          className="searchField__btn"
          data-cy="searchDelete"
          aria-label="search"
          onClick={clearSearch}
        >
          <div className="icon icon--delete" />

        </button>

      )}

    </label>
  );
};
