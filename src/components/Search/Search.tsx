import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import './Search.scss';

export const Search: React.FC = () => {
  const { search, pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      setSearchParams(searchParams);
    }, 500),
    [searchParams, pathname],
  );

  const changeQueryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const clearQueryHandler = async () => {
    await searchParams.delete('query');
    setQuery('');
    applyQuery('');
  };

  useEffect(() => {
    if (search) {
      setQuery(appliedQuery);
      applyQuery(appliedQuery);
    } else {
      clearQueryHandler();
    }
  }, [pathname]);

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        value={query}
        onChange={changeQueryHandler}
        placeholder={`Search in ${pathname.slice(1)}...`}
      />
      {query && (
        <button
          className="search__button"
          type="button"
          onClick={clearQueryHandler}
        >
          Clear input
        </button>
      )}
    </div>
  );
};
