import { debounce } from 'lodash';
import classNames from 'classnames';
import {
  useCallback,
  useContext, useState,
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

  const setQueryToSearchParams = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete('query');
    } else {
      params.set('query', value.trim());
    }

    setSearchParams(params);
  };

  const debouncedOnChange = useCallback(
    debounce(setQueryToSearchParams, 1), [],
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    debouncedOnChange(value);
  };

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
            onChange={(e) => handleQueryChange(e.target.value)}
          />

          {query === ''
            ? <div className="header__input-icon" />
            : (
              <button
                aria-label="clear"
                type="button"
                className="header__input-btn"
                onClick={() => handleQueryChange('')}
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
