import React, { useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { debounce } from 'debounce';
import './Search.scss';

export const Search = () => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const [query, setQuery] = useState('');
  const searchParams = new URLSearchParams(search);

  const applyQuery = useCallback(debounce((appliedQuery: string, searchParam: URLSearchParams) => {
    if (appliedQuery.length) {
      searchParam.set('query', appliedQuery);
    } else {
      searchParam.delete('query');
    }

    history.push(`?${searchParam.toString()}`);
  }, 500), []);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(target.value);
    applyQuery(target.value.toLowerCase(), searchParams);
  };

  const clearQuery = () => {
    setQuery('');
    searchParams.delete('query');
    history.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="Header-Search">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="Search"
        placeholder={`Search in ${pathname.slice(1)}...`}
      />
      {query
        ? (
          <button
            type="button"
            onClick={clearQuery}
            className="Search-Delete"
          >
            <img src="img/icons/delete.svg" alt="delete" />
          </button>
        )
        : (
          <img
            src="img/icons/magnifer.svg"
            alt="magnifer"
            className="Search-Magnifer"
          />
        )}
    </div>
  );
};
