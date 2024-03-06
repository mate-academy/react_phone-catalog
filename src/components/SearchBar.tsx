/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSearchParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { getSearchWith } from '../helpers/searchHelper';

type Props = {
  placeholder: string;
};
export const SearchBar: React.FC<Props> = ({ placeholder }) => {
  const title = placeholder.slice(1, placeholder.length);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputQuery, setInputQuery] = useState('');

  const debounce = (callback: Function, delay: number) => {
    let timerId = 0;

    return (...args: any) => {
      window.clearTimeout(timerId);

      timerId = window.setTimeout(() => callback(...args), delay);
    };
  };

  const debouncedSetSearchParams = useCallback(
    debounce(setSearchParams, 1000),
    [placeholder],
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value);

    debouncedSetSearchParams(
      getSearchWith(searchParams, { query: e.target.value }),
    );
  };

  useEffect(() => {
    setInputQuery('');
    setSearchParams(getSearchWith(searchParams, { query: '' }));
  }, [placeholder]);

  const handleClearSearch = () => {
    setInputQuery('');

    debouncedSetSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder={`Search in ${title}...`}
        className="search"
        value={inputQuery}
        onChange={(e) => handleSearchInput(e)}
      />

      <div className="search-bar__icons">
        {inputQuery ? (
          <div
            className="icon icon--close-search"
            onClick={handleClearSearch}
            data-cy="searchDelete"
          />
        ) : (
          <div className="icon icon--search" />
        )}
      </div>
    </div>
  );
};
