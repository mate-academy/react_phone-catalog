import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../../utils/getSearchWith';
import { debounce } from '../../utils/debounce';

import './Search.scss';

const delay = 600;

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryParam);

  const location = useLocation();

  const currentPath = useMemo(() => {
    return location.pathname.split('/')
      .filter(name => name !== '');
  }, [location]);

  useEffect(() => {
    setQuery(queryParam);
  }, [currentPath]);

  const applyQuery = useCallback(
    debounce(setSearchParams, delay),
    [currentPath],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);

    applyQuery(
      getSearchWith(searchParams, { query: value || null, page: '1' }),
    );
  };

  const clearQuery = () => {
    setQuery('');

    setSearchParams(
      getSearchWith(searchParams, { query: null }),
    );
  };

  return (
    <div className="Header-Search Search">
      <input
        className={cn(
          'Search-Input',
          {
            'Search-Input_icon_search': query === '',
          },
        )}
        type="text"
        placeholder={`Search in ${currentPath} ...`}
        value={query}
        onChange={handleChange}
      />

      <button
        className={cn(
          'Search-ClearButton',
          {
            'Search-ClearButton_active': query !== '',
          },
        )}
        type="button"
        data-cy="searchDelete"
        aria-label="clear"
        onClick={clearQuery}
      />
    </div>
  );
};
