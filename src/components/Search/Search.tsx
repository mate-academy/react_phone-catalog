import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';

import './Search.scss';
import { debounce } from '../../helpers/debounce';

export const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const [visibleQuery, setVisibleQuery] = useState(query);

  const myRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query === '') {
      myRef.current!.focus();
    }
  }, [query]);

  const updateQuery = useCallback(debounce(
    (actualQuery: string): void => {
      if (actualQuery === '') {
        searchParams.delete('query');
      } else {
        searchParams.set('query', actualQuery);
      }

      searchParams.set('page', '1');
      history.push({ search: searchParams.toString() });
    },
    1000,
  ), []);

  const handleQueryUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    updateQuery(value);
    setVisibleQuery(value);
  };

  const clearInput = () => {
    searchParams.delete('query');
    history.push({ search: searchParams.toString() });
    updateQuery('');
    setVisibleQuery('');
  };

  return (
    <form action="./" className="Search" onSubmit={e => e.preventDefault()}>
      <label htmlFor="search" className="Search__Label">
        <input
          type="text"
          className="Search__Input"
          value={visibleQuery}
          placeholder="Search in phones..."
          ref={myRef}
          onChange={handleQueryUpdate}
        />
        <button
          className={cn({
            Search__Button: true,
            'Search__Button--clear': visibleQuery.length > 0,
          })}
          onClick={clearInput}
        />
      </label>
    </form>
  );
};
