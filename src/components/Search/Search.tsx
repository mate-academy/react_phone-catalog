/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React from 'react';
import './Search.scss';
import { useLocation, useSearchParams } from 'react-router-dom';

export const Search: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('query') || '';

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    if (e.target.value.trim()) {
      params.set('query', e.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleClearSearchField = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');

    setSearchParams(params);
  };

  return (
    <div className="search">
      <input
        name="search"
        value={searchValue}
        onChange={handleSearchValueChange}
        className="search__field"
        placeholder={`Search in ${pathname.slice(1)}...`}
      />
      {!searchValue
        ? (
          <img
            className="search__icon"
            src={require('../../images/icons/search.svg').default}
            alt="Search"
          />
        )
        : (
          <button
            className="search__icon search__icon--clear"
            type="button"
            data-cy="searchDelete"
            onClick={handleClearSearchField}
          >
            <img
              src={require('../../images/icons/clear-field.svg').default}
              alt="Clear"
            />
          </button>
        )}
    </div>
  );
};
