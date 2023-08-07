import React, { useCallback, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../helpers/searchHelper';
import { debounce } from '../../helpers/debounce';

import searchIcon from '../../images/search.svg';

import './Search.scss';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const [appliedQuery, setAppliedQuery] = useState(query);

  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  const applyQuery = useCallback(
    debounce(setSearchParams, 1000), [currentPath],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(getSearchWith(searchParams, {
      query: event.target.value || null,
      currentPage: '1',
    }));

    setAppliedQuery(event.target.value);
  };

  const handleClearQuery = () => {
    setAppliedQuery('');

    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <div className="Search">
      <input
        type="text"
        className="Search__input"
        placeholder={`Search in ${currentPath}...`}
        value={appliedQuery}
        onChange={(event) => handleQueryChange(event)}
      />
      <button className="Search__btn" type="button">
        {query ? (
          <button
            type="button"
            className="Search__delete"
            data-cy="searchDelete"
            onClick={handleClearQuery}
            aria-label="searchDelete"
          />
        ) : (
          <img src={searchIcon} alt="search" />
        )}
      </button>
    </div>
  );
};
