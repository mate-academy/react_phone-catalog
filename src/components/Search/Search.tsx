import { debounce } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { SearchParams, getSearchWith } from '../../helpers/searchHelpers';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(searchQuery);

  const searchInput = useRef<HTMLInputElement>(null);

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleAppliedChange = (
    newQuery: string,
  ) => {
    setSearchWith({ query: newQuery || null });
  };

  const applyQuery = useCallback(debounce(handleAppliedChange, 1000), []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSearchFocus = () => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  };

  const handleResetSearch = () => {
    setSearchWith({ query: null });

    setQuery('');
    applyQuery('');
  };

  return (
    <div className="search">
      <input
        data-cy="ProductFilter"
        type="search"
        className="search__input"
        value={query}
        onChange={handleSearchChange}
        ref={searchInput}
        placeholder="Search in favourites..."
      />

      {query ? (
        <button
          className="search__icon-box"
          data-cy="searchDelete"
          onClick={handleResetSearch}
          type="button"
        >
          <ReactSVG
            src="img/icons/Close.svg"
          />
        </button>
      ) : (
        <div
          className="search__icon-box"
          onClick={handleSearchFocus}
          aria-hidden
        >
          <ReactSVG
            src="img/icons/Search.svg"
          />
        </div>
      )}

    </div>
  );
};
