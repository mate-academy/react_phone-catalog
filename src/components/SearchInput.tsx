import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { ReactComponent as SerchIcon }
  from '../assets/images/icons/search-Icon.svg';
import { ReactComponent as CloseIcon }
  from '../assets/images/icons/cancel-icon.svg';

const SearchInput = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const debonceCallBack = useCallback(
    debounce((value: string) => {
      searchParams.set('query', value);
      setSearchParams(searchParams);
    }, 500), [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);
    debonceCallBack(value);
  };

  const deleteQuery = () => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    deleteQuery();
  }, [location.pathname.slice(1)]);

  return (
    <div className="SearchInput">
      <input
        value={query}
        onChange={handleChange}
        type="text"
        className="SearchInput__input"
        placeholder={`Search in ${location.pathname.slice(1)}...`}
      />
      {!query ? (
        <button
          type="button"
          className="SearchInput__button"
        >
          <SerchIcon />
        </button>
      )
        : (
          <button
            type="button"
            className="SearchInput__button"
            onClick={deleteQuery}
          >
            <CloseIcon />
          </button>
        )}
    </div>
  );
};

export default SearchInput;
