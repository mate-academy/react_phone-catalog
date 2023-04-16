import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPathName } from '../../Helpers/Helpers';
import { updateSeachParams } from '../../Helpers/updateSearchParams';

import './QueryFiltering.scss';

export const QueryFiltering = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [AppliedQuery, setAppliedQuery] = useState('');
  const name = getPathName();
  const [isQuery, setIsQuery] = useState(false);

  useEffect(() => {
    if (
      ['Phones', 'Tablets', 'Accessories', 'Favorites', 'Cart']
        .includes(name)
    ) {
      setIsQuery(true);
    } else {
      setIsQuery(false);
    }
  }, [name]);

  const debounce = (func: (value: string) => void, delay: number) => {
    let timerId: number;

    return (...args: any) => {
      clearTimeout(timerId);
      timerId = setTimeout(func, delay, ...args);
    };
  };

  const onAppliedQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  useEffect(() => {
    setSearchParams(
      updateSeachParams(searchParams, { query: AppliedQuery || null }),
    );
  }, [AppliedQuery]);

  const onQueryChange = (value: string) => {
    setQuery(value);
    onAppliedQuery(value);
  };

  const onQueryClear = () => {
    setSearchParams(
      updateSeachParams(searchParams, { query: null }),
    );

    setQuery('');
  };

  return (
    <>
      {isQuery && (
        <div className="query">
          <input
            type="text"
            value={query}
            className="query__input"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={`Search in ${name}...`}
          />

          {!query.length ? (
            <img
              src="Images/Search.svg"
              className="query__img"
              alt="Search"
            />
          ) : (

            <button
              type="button"
              className="query__button"
              onClick={onQueryClear}
              data-cy="searchDelete"
            >
              <img
                src="Images/cross-icon--grey.png"
                alt="Cross"
                className="query__img--cross"
              />
            </button>

          )}
        </div>
      )}
    </>
  );
};
