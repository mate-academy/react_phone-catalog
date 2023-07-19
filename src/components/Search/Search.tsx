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
import { searchIsActive } from '../../helpers/searchIsActive';
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

  const isActive = useMemo(() => {
    return searchIsActive(location);
  }, [location]);

  const applyQuery = useCallback(
    debounceQuery(setSearchParams, 700),
    [currentPath],
  );

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    applyQuery(getSearchWith(searchParams, { query: value.trim() || null }));
  };

  const onClearQuery = () => {
    setQuery('');
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <div
      className={classNames(
        'Search',
        { isActive },
      )}
      key={currentPath}
    >
      <input
        type="text"
        value={query}
        className={classNames(
          'Search__input',
          { 'has-icon': query === '' },
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
