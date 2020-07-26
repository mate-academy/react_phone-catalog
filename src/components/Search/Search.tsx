import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import './Search.scss';

export const Search = () => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';
  const [currentQuery, setCurrentQuery] = useState<string>(query);

  const searchQueryWithDebounce = useCallback(debounce(history.push, 500), []);

  const handleSearchChange = (event: {target: { value: string }}) => {
    setCurrentQuery(event.target.value);
    searchParams.set('query', event.target.value);
    searchQueryWithDebounce({
      search: searchParams.toString(),
    });
  };

  const onHandleChange = () => {
    searchParams.set('query', '');
    history.push({
      search: searchParams.toString(),
    });
    setCurrentQuery('');
  };

  useEffect(() => {
    setCurrentQuery(query);
  }, [query]);

  return (
    <div className="search__section">
      <input
        className="search__control"
        type="text"
        placeholder={`Search in ${location.pathname.slice(1)}...`}
        value={currentQuery}
        onChange={handleSearchChange}
      />
      {query
        ? (
          <button
            type="button"
            className="search__button search__icon"
            onClick={onHandleChange}
          >
            <img src="./img/Icons/Close.svg" alt="Close Icon" />
          </button>
        )
        : (
          <span
            className="search__icon"
          >
            <img src="./img/Icons/Search.svg" alt="Search Icon" />
          </span>
        )}
    </div>
  );
};
