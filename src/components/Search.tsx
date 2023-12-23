import './Search.scss';
import React, { useCallback, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { getSearchWith } from '../pages/PhonesPage';
import { debounce } from '../helpers/debounce';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [appliedQuery, setAppliedQuery] = useState(query);

  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleResetQuery = () => {
    setAppliedQuery('');

    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        placeholder={`Search in ${location.pathname.slice(21)}...`}
        value={appliedQuery}
        onChange={(event) => handleQueryChange(event)}
      />
      <div className="search__button">
        {query ? (
          <button
            type="button"
            aria-label="reset button"
            className="search__reset"
            onClick={handleResetQuery}
          />
        ) : (
          <div className="search__icon" />
        )}
      </div>
    </div>
  );
};
