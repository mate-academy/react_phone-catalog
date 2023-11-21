import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/SearchHelper';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const { pathname } = useLocation();

  const queryCheck = searchParams.get('query');

  useEffect(() => {
    if (queryCheck === null) {
      setQuery('');
    }
  }, [queryCheck]);

  const applyQuery = useCallback(debounce(setSearchParams, 1000), [pathname]);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    if (!newQuery) {
      setQuery('');
      applyQuery(getSearchWith(
        searchParams, { query: null },
      ));

      return;
    }

    setQuery(newQuery);
    applyQuery(getSearchWith(
      searchParams, { query: newQuery },
    ));
  };

  return (
    <div className="search">
      <form action="" className="search__form">
        <input
          type="text"
          value={query}
          className="search__input"
          name="search"
          placeholder={`Search in ${useLocation().pathname.slice(1)}...`}
          onChange={handleQuery}
        />

        <div className="icon">
          {query
            ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                data-cy="searchDelete"
              >
                <img
                  src="./images/icons/Close.svg"
                  alt="search"
                  className="icon__img"
                  data-cy="searchDelete"
                />
              </button>
            )
            : (
              <img
                src="./images/icons/Search.svg"
                alt="search"
                className="icon__img"
              />
            )}
        </div>
      </form>
    </div>
  );
};
