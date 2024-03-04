import { useContext, useEffect, useState } from 'react';
import './Search.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import { getSearchWith } from '../../utils/search';

export const Search = () => {
  const { applyQuery, setAppliedQuery, appliedQuery } = useContext(CartContext);

  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchWith(params: any) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setAppliedQuery('');
    setQuery('');
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const search = searchParams.get('queryParams') || '';

    applyQuery(search.toString());
    setQuery(search.toString());
  }, [searchParams, pathname, applyQuery]);

  useEffect(() => {
    handleClearSearch();
  }, [pathname]);

  useEffect(() => {
    setSearchWith({ queryParams: appliedQuery || null });
  }, [appliedQuery]);

  return (
    <div className="search">
      <input
        type="text"
        name="search"
        className="search__input"
        value={query}
        placeholder={`Search in ${pathname.slice(1)}...`}
        onChange={handleQueryChange}
      />
      {!query && (
        <div className="search__icon">
          <span className="icon icon--search" />
        </div>
      )}
      {query && (
        <button
          aria-label="Clear search"
          type="button"
          data-cy="searchDelete"
          className="search__icon"
          onClick={handleClearSearch}
        >
          <span className="icon icon--close" />
        </button>
      )}
    </div>
  );
};
