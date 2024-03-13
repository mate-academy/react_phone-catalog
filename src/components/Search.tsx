/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../helpers/searchHelper';

import '../styles/Search.scss';

export const Search: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputQuery, setInputQuery] = useState('');

  // const query = searchParams.get('query') || '';

  const appliedQuery = useCallback(debounce((newQuery: string) => {
    setSearchParams(getSearchWith(
      searchParams, { query: newQuery },
    ));
  }, 1000), [pathname]);

  const handleQueryDelete = () => {
    setInputQuery('');
    setSearchParams(
      getSearchWith(searchParams, { query: null }),
    );
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value);
    appliedQuery(e.target.value);
  };

  useEffect(() => {
    setInputQuery('');
  }, [pathname]);

  return (
    <label htmlFor="search" className="search">
      <input
        id="search"
        type="text"
        value={inputQuery}
        className="search__input"
        placeholder={`Search in ${pathname.slice(1)}...`}
        onChange={handleQueryChange}
      />

      {inputQuery ? (
        <button
          className="search__button-delete"
          type="button"
          onClick={handleQueryDelete}
        />
      ) : (
        <div className="search__icon-search" />
      )}

    </label>
  );
};
