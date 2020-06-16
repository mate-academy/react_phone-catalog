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
  const placeholderItem = location.pathname.slice(1);

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
  }, [history, searchParams]);

  return (
    <div className="Wrap__Search">
      <input
        type="text"
        className="Search"
        placeholder={`Search in ${placeholderItem}...`}
        value={visibleQuery}
        onChange={({ target }) => {
          setVisibleQuery(target.value);
          visibleQueryWitnDebounce(target.value);
        }}
      />
      <button
        type="button"
        className={cn('Search__Btn', { 'Search__Btn--clear': visibleQuery })}
        aria-label="Mute text"
        onClick={clearSearch}
      />
    </div>
  );
};

export default Search;
