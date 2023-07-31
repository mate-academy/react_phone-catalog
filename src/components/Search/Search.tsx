/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation, useSearchParams } from 'react-router-dom';
import './Search.scss';
import classNames from 'classnames';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { isSearchVisible } from '../../helpers/isSearchVisible';
import { debounceQuery } from '../../helpers/debounceQuery';
import { getSearchWith } from '../../helpers/searchHelper';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryParam);

  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

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
        value={query}
        className={classNames(
          'Search__input',
          { 'has-icon': !query },
        )}
        placeholder={`Search in ${currentPath}...`}
        onChange={onQueryChange}
      />
      <button
        type="button"
        data-cy="searchDelete"
        className={classNames(
          'Search__clear-button',
          { isActive: query !== '' },
        )}
        onClick={onClearQuery}
      />
    </div>
  );
};
