import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';

import './Search.scss';

export const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  const myRef = useRef<HTMLInputElement>(null);

  const updateQuery = useCallback(
    (actualQuery: string): void => {
      searchParams.set('query', actualQuery);
      searchParams.set('page', '1');
      history.push({ search: searchParams.toString() });
    },
    [searchParams, history],
  );

  const clearInput = () => {
    searchParams.set('query', '');
    history.push({ search: searchParams.toString() });
  };

  useEffect(() => {
    if (query === '') {
      myRef.current!.focus();
    }
  }, [query]);

  const handleQueryUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    updateQuery(value);
  };

  return (
    <form action="./" className="Search" onSubmit={e => e.preventDefault()}>
      <label htmlFor="search" className="Search__Label">
        <input
          type="text"
          className="Search__Input"
          value={query}
          placeholder="Search in phones..."
          ref={myRef}
          onChange={handleQueryUpdate}
        />
        <button
          className={cn({
            Search__Button: true,
            'Search__Button--clear': query.length > 0,
          })}
          onClick={clearInput}
        />
      </label>
    </form>
  );
};
