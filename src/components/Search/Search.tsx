import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Search.scss';
import cn from 'classnames/bind';
import { debounce } from '../../helpers/debounce';

const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const [visibleQuery, setVisibleQuery] = useState(query);

  useEffect(() => {
    setVisibleQuery(query);
  }, [query]);

  const visibleQueryWitnDebounce = useCallback(debounce(
    (newQuery: string): void => {
      if (newQuery === '') {
        searchParams.delete('query');
      } else {
        searchParams.set('page', '1');
        searchParams.set('query', newQuery);
      }

      history.push({ search: searchParams.toString() });
    }, 1000,
  ), [visibleQuery, query]);

  const clearSearch = useCallback(() => {
    searchParams.delete('query');
    history.push({ search: searchParams.toString() });
    setVisibleQuery('');
  }, [query]);

  return (
    <div className="wrap__search">
      <input
        type="text"
        className="search"
        placeholder="Search in phones..."
        value={visibleQuery}
        onChange={({ target }) => {
          setVisibleQuery(target.value);
          visibleQueryWitnDebounce(target.value);
        }}
      />
      <button
        type="button"
        className={cn('search__btn', { 'search__btn--clear': query })}
        aria-label="Mute volume"
        onClick={clearSearch}
      />
    </div>
  );
};

export default Search;
