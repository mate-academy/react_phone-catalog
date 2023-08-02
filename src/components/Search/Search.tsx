/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../helpers/searchHelper';

import crossIcon from '../../images/cross.svg';
import searchIcon from '../../images/search.svg';

import './Search.scss';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedQuery = event.target.value.toLowerCase();

    setSearchParams(
      getSearchWith(searchParams, {
        query: normalizedQuery || null,
        currentPage: '1',
      }),
    );
  };

  const handleClearQuery = () => {
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  return (
    <div className="Search">
      <input
        type="text"
        className="Search__input"
        placeholder={`Search in ${currentPath}...`}
        value={query}
        onChange={(event) => handleQueryChange(event)}
      />
      <button className="Search__btn" type="button">
        {query ? (
          <img
            src={crossIcon}
            alt="close"
            data-cy="searchDelete"
            onClick={handleClearQuery}
          />
        ) : (
          <img src={searchIcon} alt="search" />
        )}
      </button>
    </div>
  );
};
