/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import {
  NavLink, useLocation, useNavigate, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import './Header.scss';
import { getSearchWith } from '../../helpers/searchHelper';

export const Header: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const navigate = useNavigate();

  const visiblePath = ['/phones', '/accessories', '/tablets', '/favorites'];

  const handleChangeQuery = (queryProp: string | null) => {
    navigate({
      search: getSearchWith(searchParams, { query: queryProp || null }),
    });
  };

  return (
    <header className="header">
      <div className="header__left-side-container">
        <div
          className="header__logo logo"
        >
          <NavLink
            to="../"
            className="logo__title"
          />
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
            onChange={(e) => handleChangeQuery(e.target.value)}
            value={query}
          />

          <img
            data-cy="searchDelete"
            src={query
              ? 'img/icons/close.svg'
              : 'img/icons/search.svg'}
            alt="search"
            onClick={() => {
              handleChangeQuery('');
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
        />

        <NavLink
          to="/cart"
          className={({ isActive }) => classNames(
            'header__bag bag', {
              'nav__item--is-active--right': isActive,
            },
          )}
        />
      </div>
    </header>
  );
};
