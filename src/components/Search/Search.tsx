import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Search.scss';
import cn from 'classnames/bind';

const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  const setQuery = (newQuery: string) => {
    searchParams.set('query', newQuery);
    history.push({ search: searchParams.toString() });

    if (newQuery === '') {
      searchParams.delete('query');
      history.push({ search: searchParams.toString() });
    }
  };

  const clearSearch = () => {
    searchParams.delete('query');
    history.push({ search: searchParams.toString() });
  };

  return (
    <div className="wrap__searsh">
      <input
        type="text"
        className="search"
        placeholder="Search in phones..."
        value={query}
        // value={aplaiedQuery}
        onChange={({ target }) => {
          if (searchParams.get('page') !== '1') {
            searchParams.set('page', '1');
            history.push({ search: searchParams.toString() });
          }

          setQuery(target.value);
          // setAplaiedQuery(target.value);
          // aplayQueryWithDebounce(target.value);
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
