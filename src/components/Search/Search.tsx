import './search.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSearchWith } from '../../helpers/searchHelper';
import closeIcon from '../../Images/Icons/Close.svg';
import searchIcon from '../../Images/Icons/Search.svg';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const location = useLocation();
  const { pathname } = location;
  const searchField = pathname.slice(1);

  useEffect(() => {
    const currentQuery = searchParams.get('query') || '';

    setQuery(currentQuery);
    const debounceTimer = setTimeout(() => {
      setSearchParams(query);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, []);

  const clearSearch = () => {
    setQuery('');
    setSearchParams(getSearchWith(searchParams, {
      query: null,
    }));
  };

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      clearSearch();
    } else {
      setQuery(event.target.value);
      setSearchParams(getSearchWith(searchParams,
        {
          query: event.target.value,
          page: '1',
        }));
    }
  };

  return (
    <div className="search">
      <label className="search__label">
        <input
          type="text"
          className="search__input"
          value={query}
          placeholder={`Search in ${searchField}...`}
          onChange={onQueryChange}
        />
      </label>

      <button
        type="button"
        className="search__button"
        onClick={clearSearch}
        data-cy="searchDelete"
      >
        {query ? (
          <img src={closeIcon} alt={closeIcon} />
        ) : (
          <img src={searchIcon} alt={searchIcon} />
        )}
      </button>
    </div>
  );
};
