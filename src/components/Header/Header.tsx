import './header.scss';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDebounce } from 'usehooks-ts';

import logo from '../logo/Logo.svg';
import favourites from '../icons/favourites.svg';
import favouritesRed from '../icons/favourites-red.svg';
import cart from '../icons/cart.svg';

import { Navigation } from '../Navigation';
import { Product } from '../../type/product';
import { Path } from '../../type/types';

export const Header = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isActive, setIsActive] = useState<Path | string>('/');
  const [cartList, setCartList] = useState<Product[] | null>(null);
  const [favouritesList, setFavouritesList] = useState<Product[] | null>(null);
  const [query, setQuery] = useState('');
  const debouncedValue = useDebounce<string>(query, 500);

  const setFirsPageOnSearchList = useCallback(() => {
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, [debouncedValue]);

  const setQueryToSearchParams = useCallback(() => {
    if (!debouncedValue) {
      searchParams.delete('query');
      setSearchParams(searchParams);

      return;
    }

    setFirsPageOnSearchList();
    searchParams.set('query', debouncedValue);
    setSearchParams(searchParams);
  }, [debouncedValue]);

  const getLocaleStorageData = useCallback((place: Path) => {
    if (window.localStorage.getItem(place)) {
      return JSON.parse(
        window.localStorage.getItem(place) || '',
      );
    }

    return null;
  }, []);

  const isVisibleSearchForm = useCallback(() => {
    switch (location.pathname) {
      case '/phones':
      case '/tablets':
      case '/accessories':
      case '/favourites':
        return true;
      default:
        return false;
    }
  }, [location]);

  const setActiveNav = useCallback(() => {
    const pathName = location.pathname.substring(1) || 'home';

    setIsActive(pathName);
  }, [location]);

  const clearSearchForm = useCallback(() => {
    setQuery('');
  }, []);

  useEffect(() => {
    clearSearchForm();
    setActiveNav();
  }, [location.pathname]);

  useEffect(() => {
    setQueryToSearchParams();
  }, [debouncedValue]);

  useEffect(() => {
    window.dispatchEvent(new Event('storage'));

    setFavouritesList(getLocaleStorageData(Path.Favourites));
    setCartList(getLocaleStorageData(Path.Cart));
    setActiveNav();

    window.addEventListener('storage', () => {
      setFavouritesList(getLocaleStorageData(Path.Favourites));
      setCartList(getLocaleStorageData(Path.Cart));
    });

    return () => window.removeEventListener('storage', () => {
      setFavouritesList(getLocaleStorageData(Path.Favourites));
      setCartList(getLocaleStorageData(Path.Cart));
    });
  }, []);

  return (
    <header className="header">
      <div className="header__items-block">
        <Link
          to="/"
          className="header__link-logo"
          onClick={() => setIsActive(Path.Home)}
        >
          <img
            className="header__logo"
            src={logo}
            alt="Page logo"
          />
        </Link>

        <Navigation isActive={isActive} />
      </div>

      <div className="header__items-block">
        {isVisibleSearchForm() && (
          <form
            onSubmit={(event) => event.preventDefault()}
            className="header__search-form"
          >
            <input
              type="text"
              placeholder="Search in phones..."
              className="header__search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />

            {debouncedValue.length > 0 ? (
              <button
                className="header__button header__button--close"
                data-cy="searchDelete"
                type="submit"
                aria-label="delete"
                onMouseUp={clearSearchForm}
              />
            ) : (
              <div className="header__button header__button--search" />
            )}
          </form>
        )}

        <Link
          to="favourites"
          className={classNames('header__icon-link',
            { 'header__icon-link--active': isActive === Path.Favourites })}
          onClick={() => setIsActive(Path.Favourites)}
        >
          <div className="header__icon-link-wrapper">

            { favouritesList && favouritesList.length > 0 ? (
              <img src={favouritesRed} alt="Favourites" />
            )
              : (
                <img src={favourites} alt="Favourites" />
              )}

            {favouritesList && favouritesList.length > 1 && (
              <div className="header__ellipse">
                {favouritesList.length}
              </div>
            )}
          </div>
        </Link>

        <Link
          to="cart"
          className={classNames('header__icon-link',
            { 'header__icon-link--active': isActive === Path.Cart })}
          onClick={() => setIsActive(Path.Cart)}
        >
          <div className="header__icon-link-wrapper">
            <img src={cart} alt="Cart" />

            {cartList && cartList.length > 0 && (
              <div className="header__ellipse">
                {cartList.length}
              </div>
            )}

          </div>
        </Link>
      </div>
    </header>
  );
};
