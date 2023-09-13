/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import './Search.scss';
import { useProducts } from '../../context';

export const Search = () => {
  const location = useLocation();
  const { query, setQuery } = useProducts();

  const showSearchPages
    = location.pathname === '/phones'
    || location.pathname === '/tablets'
    || location.pathname === '/accessories'
    || location.pathname === '/favourites';

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      {showSearchPages && (
        <div className="search">
          <input
            className="search__input"
            placeholder={`Search in ${location.pathname.substring(1)}`}
            onChange={handleInput}
            value={query}
          />
          {query
            ? (
              <img
                alt="search icon"
                src="./img/icons/closeFill.svg"
                className="search__icon-close"
                data-cy="searchDelete"
                onClick={() => setQuery('')}
              />
            )
            : (
              <img
                alt="search icon"
                src="./img/icons/search.svg"
                className="search__icon"
              />
            )}
        </div>
      )}
    </>
  );
};
