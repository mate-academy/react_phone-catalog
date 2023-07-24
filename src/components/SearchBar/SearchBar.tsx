import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import './searchBar.scss';

export const SearchBar: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedQuery, setAppliedQuery] = useState('');
  const debounceSearch = useDebounce(appliedQuery, 500) || null;
  const pathnameNormalized = pathname.substring(1);
  const isInputEmpty = appliedQuery.length === 0;
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  useEffect(() => {
    setSearchParams(getSearchWith(searchParams, { query: debounceSearch }));
  }, [debounceSearch]);

  const handleClearSearchInput = () => {
    setAppliedQuery('');
    setSearchParams(getSearchWith(searchParams, { query: null }));
    setIsSearchOpened(false);
  };

  useEffect(() => {
    handleClearSearchInput();
  }, [pathname]);

  const handleChangeSearchInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setAppliedQuery(ev.target.value);
  };

  const toggleSearch = () => {
    setIsSearchOpened(!isSearchOpened);
  };

  return (
    <>
      <div className={classNames(
        'search-bar',
        { 'search-bar_opened': isSearchOpened },
      )}
      >
        <input
          type="text"
          placeholder={`Search in ${pathnameNormalized}`}
          value={appliedQuery}
          onChange={handleChangeSearchInput}
          className="search-bar__input"
        />
        {/* eslint-disable-next-line */}
        <button
          data-cy="searchDelete"
          type="button"
          className={classNames(
            'search-bar__button',
            isInputEmpty
              ? 'search-bar__button_search'
              : 'search-bar__button_close',
          )}
          onClick={handleClearSearchInput}
        />
      </div>
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className="search-bar__icon"
        onClick={toggleSearch}
      />
    </>
  );
};
