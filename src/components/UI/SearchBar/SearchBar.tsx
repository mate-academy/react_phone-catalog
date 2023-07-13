import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import search from '@assets/svg/search.svg';
import close from '@assets/svg/close.svg';
import './SearchBar.scss';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get('query') || '',
  );
  const { pathname } = useLocation();

  const deleteQuery = () => {
    setSearchQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  function handleParamChange() {
    if (searchQuery) {
      searchParams.set('query', searchQuery);
      setSearchParams(searchParams);
    } else {
      deleteQuery();
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(handleParamChange, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <label className="search-bar">
      <input
        className="search-bar__field"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        type="text"
        placeholder={`Search in ${pathname.slice(1)}...`}
      />

      {searchQuery ? (
        <button
          data-cy="searchDelete"
          className="search-bar__button"
          onClick={deleteQuery}
          type="button"
        >
          <img className="search-bar__icon" src={close} alt="Clear query" />
        </button>
      ) : (
        <img className="search-bar__icon" src={search} alt="" />
      )}
    </label>
  );
};
