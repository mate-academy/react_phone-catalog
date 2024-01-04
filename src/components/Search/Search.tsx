import './Search.scss';
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import close from '../../assets/icons/Close.svg';
import search from '../../assets/icons/Search.svg';
import { SearchParams } from '../../types/SearchParams';
import { getSearchWith } from '../../helpers/searchHelper';

export const Search: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get(SearchParams.Query) || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let params;

    if (e.target.value.trim()) {
      params = getSearchWith({ query: e.target.value }, searchParams);
    } else {
      params = getSearchWith({ query: null }, searchParams);
    }

    setSearchParams(params);
  };

  const handleButtonClear = () => {
    const params = getSearchWith({ query: null }, searchParams);

    setSearchParams(params);
  };

  return (
    <div className="search">
      <input
        name="search"
        value={searchValue}
        onChange={handleSearchChange}
        className="search__input"
        placeholder={`Search in ${pathname.slice(1)}...`}
      />
      {!searchValue
        ? (
          <img
            className="search__icon icon"
            src={search}
            alt="search"
          />
        )
        : (
          <button
            type="button"
            data-cy="searchDelete"
            className="search__icon search__icon-clear icon"
            onClick={handleButtonClear}
          >
            <img
              src={close}
              alt="cross"
            />
          </button>
        )}
    </div>
  );
};
