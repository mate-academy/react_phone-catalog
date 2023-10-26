/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import classNames from 'classnames';

export const Search: React.FC = () => {
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery.trim()) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      setSearchParams(searchParams);
    }, 500),
    [searchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const reset = () => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!search.includes('query')) {
      setQuery('');
    }
  }, [pathname]);

  return (
    <div className="search">
      <input
        type="text"
        className={classNames(
          'search__input',
          {
            'search__input--focus': query,
          },
        )}
        placeholder={`Search in ${pathname.slice(1)}...`}
        value={query}
        onChange={handleQueryChange}
      />
      {query && (
        <button
          type="button"
          data-cy="searchDelete"
          className="search__button"
          onClick={reset}
        />
      )}
    </div>
  );
};
