import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './search.scss';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const showSearchPages = ['/Phones', '/Tablets', '/Accessories', '/Favourites']
    .includes(location.pathname);

  const placeholderName = `Search in ${location.pathname.substring(1)}`;

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;

    setQuery(value);
  };

  // console.log(!!query);

  return (
    <>
      {showSearchPages && (
        <label
          className="search__container"
          htmlFor="mySearch"
        >
          <input
            onChange={handleSearch}
            type="text"
            placeholder={placeholderName}
            id="mySearch"
            className="search__query"
          />

          {query
            ? (<div className="icon__close" />)
            : (<div className="icon icon__search" />)}
        </label>
      )}
    </>
  );
};
