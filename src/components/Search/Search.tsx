import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import './Search.scss';
import searchIcon from '../../images/Search.svg';

export const Search: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') || '');

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    if (e.target.value) {
      params.set('query', e.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params, { replace: true });
  };

  const handleClearSearchField = () => {
    setInputValue('');
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="search">
      <div className="search__container">
        <input
          name="search"
          value={inputValue}
          onChange={handleSearchValueChange}
          className="search__field"
          placeholder={`Search in ${pathname.slice(1)}...`}
        />
        {inputValue ? (
          <button
            className="search__icon search__icon--clear"
            aria-label="button"
            type="button"
            onClick={handleClearSearchField}
          />
        ) : (
          <img
            className="search__icon"
            src={searchIcon}
            alt="Search"
          />
        )}
      </div>
    </div>
  );
};
