/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import './Search.scss';
import { useProducts } from '../../context';

export const Search = () => {
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useProducts();

  const showSearchPages = ['/phones', '/tablets', '/accessories', '/favourites']
    .includes(location.pathname);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const placeholderName = `Search in ${location.pathname.substring(1)}`;

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
                onClick={() => setSearchQuery('')}
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
