import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

import './Search.scss';

import searchIcon from '../../assets/icons/Search.svg';
import { getSearchWith } from '../../helpers/searchHelper';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const query = searchParams.get('query') || '';
  const location = useLocation();

  const debouncedHandleChange = useCallback(
    debounce((value: string) => {
      setSearchParams(getSearchWith(searchParams, { query: value || null }));
    }, 1000), [searchParams],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    debouncedHandleChange(event.target.value);
  };

  useEffect(() => {
    setSearchValue('');
  }, [location.pathname]);

  useEffect(() => {
    if (!query) {
      return;
    }

    setSearchValue(query);
  }, []);

  return (
    <div className="search">
      <input
        type="search"
        placeholder={`Search in ${location.pathname.slice(1)}...`}
        className="search__field"
        value={searchValue}
        onChange={handleChange}
      />

      {!searchValue && (
        <img
          src={searchIcon}
          alt="Search icon"
          className="search__icon"
        />
      )}
    </div>
  );
};
