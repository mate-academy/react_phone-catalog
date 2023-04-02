import { useLocation } from 'react-router';
import './search.scss';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from '../../helpers/helpers';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [apliedQuery, setApliedQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (!query.length) {
      searchParams.delete('query');
      setApliedQuery('');
    } else {
      searchParams.set('query', apliedQuery);
    }

    setSearchParams(searchParams);
  }, [apliedQuery, query]);

  const applyQuery = useCallback(debounce(setApliedQuery, 500), []);

  return (
    <>
      <input
        type="search"
        name="query"
        className="search"
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          applyQuery(e.currentTarget.value);
        }}
        placeholder={`Search in ${location.pathname.slice(1)}...`}
      />
      {query.length > 0 ? (
        <button
          type="button"
          onClick={() => setQuery('')}
        >
          <img className="search__img" src="img/icons/Close.svg" alt="close" />
        </button>
      ) : (
        <img className="search__img" src="img/icons/Search.svg" alt="search" />
      )}
    </>
  );
};
