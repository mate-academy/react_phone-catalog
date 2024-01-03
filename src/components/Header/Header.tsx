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
import { MOBILE_MAX_WIDTH } from '../../helpers/vars';

const SEARCH_PATHNAMES = ['/phones', '/tablets', '/accessories', '/favorites'];

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    favorites, addedToCart, isMenuActive, setIsMenuActive, windowWidth,
  } = useContext(ProductContext);
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
      <button
        className={classNames(
          'icon icon--menu',
          { 'icon--menu--active': isMenuActive },
        )}
        type="button"
        aria-label="menu"
        onClick={() => setIsMenuActive(!isMenuActive)}
      />

      <div className="header__content">
        <div className="header__left">
          <Link to="home" className="header__logo logo" />
          <div className="header__nav">
            <Nav />
          </div>
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
            />
            {query === ''
              ? <div className="header__input-icon" />
              : (
                <button
                  aria-label="clear"
                  type="button"
                  className="header__input-btn"
                  onClick={() => setQuery('')}
                />
              )}
          </div>
          {windowWidth >= MOBILE_MAX_WIDTH && (
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
          )}
          {windowWidth >= MOBILE_MAX_WIDTH && (
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
          )}
        </div>
      </div>
    </header>
  );
}
