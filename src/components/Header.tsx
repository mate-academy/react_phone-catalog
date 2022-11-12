/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { PageNavLink } from './PageNavLink';
import '../styles/blocks/container.scss';
import { getSearchWith } from '../helpers/searchHelper';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const query = searchParams.get('query') || '';

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.currentTarget.value || null }),
    );
  };

  return (
    <header className="header">

      {pathname === '/phones' || pathname === '/tablets' || pathname === '/favorites' || pathname === '/accessories'
        ? (
          <div className="header__wrapper header__wrapper--search">

            <Link
              to="../"
              className="header__logo grid__item grid__item--1-1"
            >
              <img src="img/svg/logo.svg" alt="Logo" />
            </Link>

            <nav
              className="header__nav"
              data-cy="nav"
            >
              <PageNavLink
                to="/home"
                text="Home"
              />
              <PageNavLink
                to="phones"
                text="Phones"
              />
              <PageNavLink
                to="tablets"
                text="Tablets"
              />
              <PageNavLink
                to="accessories"
                text="Accessories"
              />
            </nav>

            <input
              type="text"
              className="header__search body-text"
              placeholder={`Search in ${pathname.slice(1)}...`}
              value={query}
              onChange={onQueryChange}
            />

            <div className="header__icons">
              <NavLink
                to="../favorites"
                className={({ isActive }) => (
                  classNames('header__icon header__icon--search',
                    { 'header__icon--active': isActive })
                )}
              >
                <img src="img/svg/heart-black.svg" alt="Heart" />
              </NavLink>
              <NavLink
                to="../cart"
                className={({ isActive }) => (
                  classNames('header__icon header__icon--search',
                    { 'header__icon--active': isActive })
                )}
              >
                <img src="img/svg/busket.svg" alt="Busket" />
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="header__wrapper">

            <Link
              to="../"
              className="header__logo grid__item grid__item--1-1"
            >
              <img src="img/svg/logo.svg" alt="Logo" />
            </Link>

            <nav
              className="header__nav"
              data-cy="nav"
            >
              <PageNavLink
                to="/"
                text="Home"
              />
              <PageNavLink
                to="phones"
                text="Phones"
              />
              <PageNavLink
                to="tablets"
                text="Tablets"
              />
              <PageNavLink
                to="accessories"
                text="Accessories"
              />
            </nav>

            <div className="header__icons">
              <NavLink
                to="../favorites"
                className={({ isActive }) => (
                  classNames('header__icon',
                    { 'header__icon--active': isActive })
                )}
              >
                <img src="img/svg/heart-black.svg" alt="Heart" />
              </NavLink>
              <NavLink
                to="../cart"
                className={({ isActive }) => (
                  classNames('header__icon',
                    { 'header__icon--active': isActive })
                )}
              >
                <img src="img/svg/busket.svg" alt="Busket" />
              </NavLink>
            </div>
          </div>
        )}
    </header>
  );
};
