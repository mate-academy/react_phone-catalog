import { useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
// import { debounce } from 'lodash';
import debounce from 'lodash.debounce';

import './Search.scss';

export const Search = () => {
  const searchPages = ['/phones', '/tablets', '/accessories', '/favorites'];
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchValue, setSearchValue] = useState(query);

  const debouncedQuery = useMemo(
    () =>
      debounce(value => {
        if (!value.trim()) {
          searchParams.delete('query');
        } else {
          searchParams.set('query', value.trim());
          searchParams.set('page', '1');
        }

        setSearchParams(searchParams);
      }, 1000),
    [searchParams, setSearchParams],
  );

  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchValue(value);
    debouncedQuery(value);
  };

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  return (
    <div className="search">
      {searchPages.includes(location.pathname) && (
        <>
          <input
            className="search__input"
            type="text"
            placeholder={`Search in ${location.pathname.slice(1)}`}
            value={searchValue}
            onChange={handleSearchFilter}
          />

          <button
            onClick={() => {
              setSearchValue('');
              const params = new URLSearchParams(searchParams);

              params.delete('query');
              setSearchParams(params);
            }}
            className="search__button"
            type="button"
            aria-label="search button"
          >
            <i
              className={cn('ico ico-search', {
                'search__ico--hide': searchValue,
                search__ico: !searchValue,
              })}
            />
            <i
              className={cn('ico ico-close', {
                'search__ico-close--hide': !searchValue,
                'search__ico-close': searchValue,
              })}
              data-cy="searchDelete"
            />
          </button>
        </>
      )}
    </div>
  );
};
