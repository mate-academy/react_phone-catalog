import React, { useCallback, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { QueryParams } from '../../types/QueryParams';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import './Search.scss';

export const Search: React.FC = () => {
  const location = useLocation().pathname.slice(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(QueryParams.Query) || '';

  const [inputValue, setInputValue] = useState(query);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const applyQuery = useCallback(debounce((newQuery: string) => {
    setSearchWith({ query: newQuery || null });
  }, 1000), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    applyQuery(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchWith({ query: null });
  };

  return (
    <form className="Search" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder={`Search in ${location}...`}
        className="Search__input"
        value={inputValue}
        onChange={handleChange}
      />

      {query ? (
        <button
          type="button"
          className="Search__icon Search__icon--close"
          aria-label="Clear"
          onClick={handleClear}
          data-cy="searchDelete"
        />
      ) : (
        <span className="Search__icon Search__icon--search" />
      )}
    </form>
  );
};
