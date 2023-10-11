/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import './Search.scss';
import classNames from 'classnames';

import { isSearchVisible } from '../../../helpers/isSearchVisible';
import { getSearchWith } from '../../../helpers/searchHelper';
import { debounceQuery } from '../../../helpers/debounceQuery';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryParam);

  const location = useLocation();

  const currentPath = useMemo(() => {
    return location.pathname.split('/')[1];
  }, [location]);

  useEffect(() => {
    setQuery(queryParam);
  }, [currentPath]);

  const isVisible = useMemo(() => {
    return isSearchVisible(location);
  }, [currentPath]);

  const applyQuery = useCallback(
    debounceQuery(setSearchParams, 600),
    [currentPath],
  );

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);

    const params = {
      query: value.trim() || null,
    };

    applyQuery(
      getSearchWith(searchParams, params),
    );
  };

  const onClearQuery = () => {
    setQuery('');

    setSearchParams(
      getSearchWith(searchParams, { query: null }),
    );
  };

  return (
    <div
      className={classNames(
        'Search',
        { isVisible },
      )}
    >
      <input
        type="text"
        aria-label="search"
        value={query}
        onChange={onQueryChange}
        placeholder={`Search in ${currentPath}...`}
        className={classNames(
          'Search--input',
          { 'has-icon': !query },
        )}
      />
      <button
        type="button"
        data-cy="searchDelete"
        aria-label="clear-search"
        onClick={onClearQuery}
        className={classNames(
          'Search--clear-button',
          { isActive: !!query },
        )}
      />
    </div>
  );
};
