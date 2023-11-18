import {
  ChangeEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { debounceQuery } from '../../helpers/debounceQuery';
import { getSearchWith } from '../../helpers/getSearchWith';
import './Search.scss';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = searchParams.get('query') || '';
  const [query, setQuery] = useState('');

  const location = useLocation();
  const currentPath = useMemo(() => {
    return location.pathname.split('/')[1];
  }, [location]);

  useEffect(() => {
    setQuery(queryParams);
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

    applyQuery(getSearchWith(searchParams, params));
  };

  const onClearQuery = () => {
    setQuery('');

    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <div className="Search">
      <input
        type="text"
        className={cn('Search__input', { 'has-icon': !query })}
        placeholder={`Search in ${currentPath}...`}
        value={query}
        onChange={onQueryChange}
      />
      <button
        type="button"
        className={cn('Search__clear-button', { isActive: query !== '' })}
        aria-label="clear-search"
        onClick={onClearQuery}
        data-cy="searchDelete"
      />
    </div>
  );
};
