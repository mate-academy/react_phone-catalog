import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../helpers/searchHelper';

type Props = {
  category: string,
};

export const SearchBar: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('query') || '');

  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams,
      { query: event.target.value || null }));
  };

  const mobileVersion = window.innerWidth <= 768;
  const placeholder = mobileVersion ? 'on page' : `in ${category}`;

  const clearQuery = () => {
    setSearchParams(getSearchWith(searchParams, { query: '' }));
  };

  return (
    <div className="header__search">
      <input
        className="header__search__input"
        type="text"
        placeholder={`Search ${placeholder}...`}
        onChange={handleSearchBar}
        value={query}
      />
      {query.length > 0 ? (
        <button
          type="button"
          aria-label="close-button"
          className="icon icon--close close-button"
          onClick={clearQuery}
        />
      ) : <p className="icon icon--search" />}
    </div>
  );
};
