import {
  useEffect, useRef, useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { useDebounce } from '../../helpers/useDebounce';
import { getSearchParams } from '../ProductsLayout/utils';

import { Params } from '../../types/params';
import { SearchTypes } from '../../types/searchType';

import './search.scss';

const pagesToDisplay = ['/phones', '/tablets', '/accessories', '/favorites'];

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get(SearchTypes.Query) || '';

  const [query, setQuery] = useState(searchQuery);
  const { pathname } = useLocation();
  const searchInput = useRef<HTMLInputElement>(null);
  const debouncedSearch = useDebounce(query, 1000);

  const setSearch = (params: Params) => {
    const search = getSearchParams(params, searchParams);

    setSearchParams(search);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    setSearch({ [SearchTypes.Page]: '1' });
  };

  const handleSearchFocus = () => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  };

  const handleResetSearch = () => {
    setSearch({
      [SearchTypes.Query]: null,
      [SearchTypes.Page]: '1',
    });

    setQuery('');
  };

  useEffect(() => {
    setSearch({ [SearchTypes.Query]: debouncedSearch || null });
  }, [debouncedSearch]);

  if (!pagesToDisplay.some(page => page === pathname)) {
    return null;
  }

  return (
    <div
      className="search"
      aria-hidden
    >
      <input
        type="text"
        className="search__input"
        name="search"
        placeholder={`Search in ${pathname.split('/')[1]}...`}
        ref={searchInput}
        value={query}
        onChange={handleSearchChange}
      />

      <div className="search__icon-container">
        {query ? (
          <div
            onClick={handleResetSearch}
            data-cy="searchDelete"
            aria-hidden
          >
            <ReactSVG src="img/icons/Close.svg" />
          </div>
        ) : (
          <div
            onClick={handleSearchFocus}
            aria-hidden
          >
            <ReactSVG src="img/icons/Search.svg" />
          </div>
        )}
      </div>
    </div>
  );
};
