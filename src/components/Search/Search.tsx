/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from 'context';
import './Search.scss';

export const Search = () => {
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useProducts();

  const showSearchPages = ['/phones', '/tablets', '/accessories', '/favourites']
    .includes(location.pathname);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const placeholderName = `Search in ${location.pathname.substring(1)}`;

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    handleSearchClear();
  }, [location]);

  return (
    <>
      {showSearchPages && (
        <div className="search">
          <input
            className="search__input"
            placeholder={placeholderName}
            onChange={handleInput}
            value={searchQuery}
          />
          {searchQuery
            ? (
              <img
                alt="search icon"
                src="img/icons/closeFill.svg"
                className="search__icon-close"
                data-cy="searchDelete"
                onClick={handleSearchClear}
              />
            )
            : (
              <img
                alt="search icon"
                src="img/icons/search.svg"
                className="search__icon"
              />
            )}
        </div>
      )}
    </>
  );
};
