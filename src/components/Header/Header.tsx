/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';

import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import './Header.scss';
import { getSearchWith } from '../../helpers/searchHelper';
import { Product } from '../../types/Product';
import { NavType } from '../../types/navType';
import { findUniqueProducts } from '../../helpers/findUniqueProducts';

export const Header: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const navigate: NavType = useNavigate();
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const [realFavorites, setRealFavorites] = useState<Product[]>(favorites);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    window.onstorage = () => {
      const tempFav = JSON.parse(localStorage.getItem('favorites') || '[]');

      setRealFavorites(tempFav);
    };
  }, []);

  useMemo(() => {
    setInputValue(query);
  }, [query]);

  const realCartItems = findUniqueProducts(cartItems);

  const visiblePath = ['/phones', '/accessories', '/tablets', '/favorites'];

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: getSearchWith(searchParams, { query: e.target.value || null }),
    });
  };

  const debouncedQueryChange = debounce(handleChangeQuery, 1000);

  return (
    <header className="header">
      <div className="header__left-side-container">
        <div
          className="header__logo logo"
        >
          <NavLink
            to="../"
            className="logo__title"
          >
            <img
              src="img/icons/logo.svg"
              alt="logo"
            />
          </NavLink>
        </div>

        <nav className="header__nav nav">
          <ul className="nav__list">
            <NavLink
              className={({ isActive }) => classNames('nav__item', {
                'nav__item--is-active': isActive,
                'nav__item--is-hidden': location.pathname.includes('cart'),
              })}
              to="/"
              end
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => classNames('nav__item', {
                'nav__item--is-active': isActive,
                'nav__item--is-hidden': location.pathname.includes('cart'),
              })}
              to="/phones"
            >
              Phones
            </NavLink>

            <NavLink
              className={({ isActive }) => classNames('nav__item', {
                'nav__item--is-active': isActive,
                'nav__item--is-hidden': location.pathname.includes('cart'),
              })}
              to="/tablets"
            >
              Tablets
            </NavLink>

            <NavLink
              className={({ isActive }) => classNames('nav__item', {
                'nav__item--is-active': isActive,
                'nav__item--is-hidden': location.pathname.includes('cart'),
              })}
              to="/accessories"
            >
              Accessories
            </NavLink>
          </ul>
        </nav>
      </div>

      <div className="header__right-side-container">

        <label
          className={classNames('header__search', {
            'header__search--is-hidden':
              !visiblePath.includes(location.pathname),
            'nav__item--is-hidden': location.pathname.includes('cart'),
          })}
        >
          <input
            type="text"
            className="header__search--field"
            placeholder={`Search in ${location.pathname.slice(1)}...`}
            onChange={(e) => {
              setInputValue(e.target.value);

              debouncedQueryChange(e);
            }}
            value={inputValue}
          />

          <img
            data-cy="searchDelete"
            src={query
              ? 'img/icons/close.svg'
              : 'img/icons/search.svg'}
            alt="search"
            onClick={() => {
              navigate({
                search: getSearchWith(searchParams, { query: null }),
              });
            }}
          />
        </label>

        <NavLink
          to="/favorites"
          className={({ isActive }) => classNames(
            'header__favourites favourites', {
              'nav__item--is-active--right': isActive,
              'favourites--is-hidden': location.pathname.includes('cart'),
            },
          )}
        >
          <img
            src="img/icons/favourites.svg"
            alt="favorites"
          />
          {realFavorites && realFavorites.length > 0 && (
            <div className="counter">
              <div
                className="counter__red-count"
              >
                <img
                  src="img/icons/red-counter.svg"
                  alt="counter"
                />
                <div className="counter__count">
                  {realFavorites.length}
                </div>
              </div>
            </div>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => classNames(
            'header__bag bag', {
              'nav__item--is-active--right': isActive,
            },
          )}
        >
          <img
            src="img/icons/shop-bag.svg"
            alt="bag"
          />
          {cartItems && cartItems.length > 0 && (
            <div className="counter">
              <div
                className="counter__red-count"
              >
                <img
                  src="img/icons/red-counter.svg"
                  alt="counter"
                />
                <div className="counter__count">
                  {realCartItems.length}
                </div>
              </div>
            </div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
