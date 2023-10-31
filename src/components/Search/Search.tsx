import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import { getSearchWith } from '../../helpers/getSearchWith';
import './Search.scss';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const { pathname } = useLocation();

  useEffect(() => {
    const currentQuery = searchParams.get('query') || '';

    setQuery(currentQuery);
    setSearchParams(getSearchWith(
      searchParams, { query: currentQuery || null },
    ));
  }, [pathname, searchParams, setSearchParams]);

  const applyQuery = useMemo(
    () => debounce(setSearchParams, 1000),
    [setSearchParams],
  );

  const deleteQuery = () => {
    setQuery('');
    applyQuery(getSearchWith(
      searchParams, {
        query: null,
      },
    ));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      deleteQuery();
    } else {
      setQuery(event.target.value);
      applyQuery(getSearchWith(
        searchParams, {
          query: event.target.value,
          page: '1',
        },
      ));
    }
  };

  return (
    <div className="Search">
      <input
        type="text"
        className="Search__input"
        placeholder={`Search in ${pathname.slice(1)}...`}
        value={query}
        onChange={handleQueryChange}
        onBlur={handleQueryChange}
      />

      {query ? (
        <button
          type="button"
          data-cy="searchDelete"
          aria-label="Delete query"
          className="Search__clear"
          onClick={deleteQuery}
        />
      ) : (
        <div className="Search__icon" />
      )}

    </div>
  );
};
