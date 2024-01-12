import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { ICONS } from '../../icons';
import './Search.scss';
import { getSearchWith } from '../../helpers/getSearchWith';
import classNames from 'classnames';

export const Search: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [inputQuery, setInputQuery] = useState(query);

  const field = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (field.current && isSearchFocused) {
      field.current.focus();
    }
  }, [isSearchFocused]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    setInputQuery('');
  }, [pathname]);

  const handleClearQuery = () => {
    setInputQuery('');
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  const applyQuery = debounce((newQuery: string) => {
    setSearchParams(getSearchWith(searchParams, {
      query: newQuery || null,
    }));
  }, 1000);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
    applyQuery(event.target.value);
  };

  return (
    <label htmlFor="search" className="search">
      <input
        id="search"
        type="text"
        placeholder={`Search in ${pathname.slice(1)}...`}
        className="search__input"
        value={inputQuery}
        ref={field}
        onChange={handleQueryChange}
        onBlur={() => setIsSearchFocused(false)}
        onFocus={() => setIsSearchFocused(true)}
      />
      {inputQuery ? (
        <button
          type="button"
          data-cy="searchDelete"
          aria-label="search"
          onClick={handleClearQuery}
          className={classNames('search__button', {
            'search__button--focus': isSearchFocused,
          })}
        >
          <div className="search__icon" />
        </button>
      ) : (
        <img
          src={ICONS.iconSearch}
          alt="Search icon"
          className="search__icon"
        />
      )}
    </label>
  );
};
