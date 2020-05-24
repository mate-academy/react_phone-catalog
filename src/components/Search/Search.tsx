import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';

import './Search.scss';

export const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  const [visibleQuery, setVisibleQuery] = useState(query);

  const updateQuery = useCallback(
    (actualQuery: string): void => {
      searchParams.set('query', actualQuery);
      history.push({ search: searchParams.toString() });
    },
    [searchParams, history],
  );

  const handleQueryUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setVisibleQuery(value);
    updateQuery(value);
  };

  return (
    <form action="./" className="Search" onSubmit={e => e.preventDefault()}>
      <label htmlFor="search" className="Search__Label">
        <input
          type="text"
          className="Search__Input"
          value={visibleQuery}
          placeholder="Search in phones..."
          onChange={handleQueryUpdate}
        />
        <button type="button" className={cn({
          'Search__Button': true,
          'Search__Button--clear': false,
        })} />
      </label>
    </form>
  );
};
