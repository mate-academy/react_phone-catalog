import { useDebounce } from 'use-debounce';
import classNames from 'classnames';
import {
  useContext, useEffect, useState,
} from 'react';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import { ProductContext } from '../../helpers/ProductsContext';
import { Nav } from '../Nav';
import './Header.scss';

const SEARCH_PATHNAMES = ['/phones', '/tablets', '/accessories', '/favorites'];

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites, addedToCart } = useContext(ProductContext);
  const location = useLocation();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [value] = useDebounce(query, 500);

  const setQueryToSearchParams = (queryValue: string) => {
    if (!queryValue.trim()) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', queryValue.trim());
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    setQueryToSearchParams(value);
  }, [value]);

  return (
    <header className="page__header header">
      <div className="header__left">
        <Link to="home" className="header__logo logo" />

        <Nav />
      </div>

      <div className="header__right">
        <div
          className={classNames(
            'header__input-container',
            {
              'header__input-container--active': SEARCH_PATHNAMES
                .includes(location.pathname),
            },
          )}
        >
          <input
            placeholder="Search in phones..."
            className="header__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            // onChange={(e) => handleQueryChange(e.target.value)}
          />

          {query === ''
            ? <div className="header__input-icon" />
            : (
              <button
                aria-label="clear"
                type="button"
                className="header__input-btn"
                onClick={() => setQuery('')}
                // onClick={() => handleQueryChange('')}
              />
            )}
        </div>

        <NavLink
          to="favorites"
          className={({ isActive }) => classNames(
            'icon icon--fav',
            { 'icon--active': isActive },
          )}
        >
          {favorites.length > 0 && (
            <div className="counter">
              {favorites.length}
            </div>
          )}
        </NavLink>
        <NavLink
          to="cart"
          className={({ isActive }) => classNames(
            'icon icon--cart',
            { 'icon--active': isActive },
          )}
        >
          {addedToCart.length > 0 && (
            <div className="counter">
              {addedToCart.length}
            </div>
          )}
        </NavLink>
      </div>
    </header>
  );
}
