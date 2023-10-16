import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import debounce from 'lodash.debounce';

import './Search.scss';

import searchIcon from '../../assets/icons/Search.svg';
import { getSearchWith } from '../../helpers/searchHelper';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const query = searchParams.get('query') || '';
  const location = useLocation();

  const debouncedHandleChange = useCallback(
    debounce((value: string) => {
      setSearchParams(getSearchWith(searchParams, { query: value || null }));
    }, 1000), [searchParams, searchValue],
  );

  const handleBtnClick = useCallback(() => {
    setIsOpen(state => !state);
  }, []);

  const handleBlur = useCallback(() => {
    setIsOpen(state => !state);
  }, []);

  const handleChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);

    debouncedHandleChange(event.target.value);
  }, [searchParams]);

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
      <button
        type="button"
        className="search__btn"
        onClick={handleBtnClick}
      >
        <img
          src={searchIcon}
          alt="Search icon"
          className="search__btn-icon"
        />
      </button>

      <input
        type="search"
        placeholder={`Search in ${location.pathname.slice(1)}...`}
        className={classNames('search__field', {
          'search__field--active': isOpen,
        })}
        value={searchValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {!searchValue && (
        <img
          src={searchIcon}
          alt="Search icon"
          className={classNames('search__icon', {
            'search__icon--active': isOpen,
          })}
        />
      )}
    </div>
  );
};
