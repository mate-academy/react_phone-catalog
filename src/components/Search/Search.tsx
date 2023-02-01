import React, {
  Dispatch, SetStateAction, useCallback, useEffect, useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import './Search.scss';

const debounce = (
  f: SetStateAction<Dispatch<string>>,
  delay: number,
) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const Search: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(
    searchParams.get('query') || '',
  );
  const [appliedQuery, setAppliedQuery] = useState(
    '',
  );

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000), [],
  );

  useEffect(() => {
    if (!appliedQuery) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', appliedQuery);
    }

    setSearchParams(searchParams);
  }, [appliedQuery]);

  return (
    <label className="search">
      <input
        type="text"
        className="search__input"
        placeholder={`Search in ${pathname.slice(1)}...`}
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          applyQuery(event.target.value);
        }}
      />
      {query && (
        <button
          aria-label="searchDeleteBtn"
          className="search__delete-button"
          data-cy="searchDelete"
          type="button"
          onClick={() => {
            setQuery('');
            setAppliedQuery('');
          }}
        />
      )}
    </label>
  );
};
