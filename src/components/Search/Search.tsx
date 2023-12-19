import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import './Search.scss';

type Props = {
  applyQuery: (arg: string) => void;
};

export const Search: React.FC<Props> = ({
  applyQuery,
}) => {
  const currentPath = useLocation().pathname.slice(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  function setSearchWith(params: SearchParams) {
    const searchString = getSearchWith(searchParams, params);
    const updatedSearchParams = new URLSearchParams(searchString);

    updatedSearchParams.set('page', '1');

    setSearchParams(updatedSearchParams);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
    applyQuery(event.target.value);
  }

  return (
    <label className="search" htmlFor="search-input">
      <input
        className="nav-search"
        type="text"
        name="search"
        id="search-input"
        placeholder={`Search in ${currentPath}...`}
        value={query}
        onChange={handleQueryChange}
      />

      {!query ? (
        <img
          src="img/icons/search.svg"
          alt="search"
          className="search-icon"
        />
      ) : (
        <button
          data-cy="searchDelete"
          type="button"
          className="search__delete-button"
          onClick={() => {
            setSearchWith({ query: null });
            applyQuery('');
          }}
        >
          <img
            src="img/icons/DarkClose.svg"
            alt="delete-button"
          />
        </button>
      )}
    </label>
  );
};
