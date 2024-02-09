/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import './Navbar.scss';
import classNames from 'classnames';
import { GlobalContext } from '../../GlobalContext';
import { Logo } from '../Logo';
import { SearchParams, getSearchWith } from '../../services/searchHelper';

const getActiveClass = ({ isActive }: { isActive: boolean }) => classNames(
  'Navbar__link',
  { 'Navbar__link--active': isActive },
);

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const {
    favouriteItems,
    cartItems,
  } = useContext(GlobalContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({
      query: event.target.value || null,
      page: '1',
    });
  };

  const searchIn = pathname
    .split('')
    .filter(ch => !ch.includes('/'))
    .join('');

  return (
    <nav className="Navbar" role="navigation">
      <div className="Navbar__left">
        <Logo />

        <ul className="Navbar__list">
          <li className="Navbar__item">
            <NavLink
              to="/"
              className={getActiveClass}
            >
              Home
            </NavLink>
          </li>

          <li className="Navbar__item">
            <NavLink
              to="/phones"
              className={getActiveClass}
            >
              Phones
            </NavLink>
          </li>

          <li className="Navbar__item">
            <NavLink
              to="/tablets"
              className={getActiveClass}
            >
              Tablets
            </NavLink>
          </li>

          <li className="Navbar__item">
            <NavLink
              to="/accessories"
              className={getActiveClass}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="Navbar__right">
        {(searchIn === 'phones'
          || searchIn === 'tablets'
          || searchIn === 'accessories'
          || searchIn === 'favourites'
        ) && (
          <div
            className="Navbar__search-bar"
            style={{
              backgroundColor: query ? '#fafbfc' : '',
            }}
          >
            <input
              placeholder={`Search in ${searchIn}...`}
              className="Navbar__search"
              value={query}
              onChange={handleSearch}
              style={{
                backgroundColor: query ? '#fafbfc' : '',
              }}
            />

            {!query ? (
              <img
                src="img/icons/search.svg"
                alt="search"
                style={{
                  height: '16px',
                  width: '16px',
                }}
              />
            ) : (
              <button
                data-cy="searchDelete"
                type="button"
                style={{
                  height: '16px',
                  width: '16px',
                  backgroundColor: query ? '#fafbfc' : '',
                  border: '1px solid transparent',
                  backgroundImage: 'url(img/icons/cross.svg)',
                  cursor: 'pointer',
                }}
                onClick={() => setSearchWith({ query: null })}
              />
            )}
          </div>
        )}

        <Link
          to="/favourites"
          className={classNames(
            'Navbar__heart Navbar__link-icons',
            { 'Navbar__link-icons--active': pathname === '/favourites' },
          )}
        >
          <div
            className="Navbar__icons-count"
            style={{ display: favouriteItems.length ? '' : 'none' }}
          >
            <span className="Navbar__icons-text">
              {favouriteItems.length}
            </span>
          </div>
        </Link>

        <Link
          to="/cart"
          className={classNames(
            'Navbar__cart Navbar__link-icons',
            { 'Navbar__link-icons--active': pathname === '/cart' },
          )}
        >
          <div
            className="Navbar__icons-count"
            style={{ display: cartItems.length ? '' : 'none' }}
          >
            <span className="Navbar__icons-text">
              {cartItems.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};
