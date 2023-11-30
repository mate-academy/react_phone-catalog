/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import debounce from 'lodash.debounce';

import './Search.scss';

export const Search = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const location = useLocation();
  const path = location.pathname.replace('/', '');

  useEffect(() => {
    setCurrentQuery(query);
  }, [path]);

  const removeQuery = () => {
    setCurrentQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  const applyQuery = useCallback(
    debounce((newQuery) => {
      searchParams.set('query', newQuery);
      if (newQuery === '') {
        removeQuery();
      }

      setSearchParams(searchParams);
    }, 1000),
    [path],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(event.target.value);
    applyQuery(event.target.value);
  };

  return (
    <div className="Search">
      <input
        type="text"
        className="Search__input"
        placeholder={`Search in ${path}...`}
        value={currentQuery}
        onChange={handleQueryChange}
      />
      <button
        data-cy="searchDelete"
        type="button"
        className={classNames('Search__button', {
          'Search__button--delete': !!query,
        })}
        onClick={removeQuery}
        disabled={!query}
      />
    </div>
  );
};
