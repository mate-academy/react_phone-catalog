import { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../../utils/getSearchWith';

import './Search.scss';
import { debounce } from '../../utils/debounce';

const delay = 300;

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryParam);

  const location = useLocation();
  const currentPath = location.pathname
    .split('/')
    .filter(name => name !== '');

  useEffect(() => {
    setQuery(queryParam);
  }, [currentPath]);

  const applyQuery = useCallback(
    debounce(setSearchParams, delay),
    [currentPath],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setQuery(value);

    applyQuery(
      getSearchWith(searchParams, { query: value || null }),
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
