/* eslint-disable max-len */

import classNames from 'classnames';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import debounce from 'lodash.debounce';

import './Header.scss';
import '../../styles/Nav.scss';

import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { SiteContext } from '../SiteContex';
import { getSearchWith } from '../../utils/searchHelper';

export const Header = () => {
  const { favourites, cart } = useContext(SiteContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const queryCheck = searchParams.get('query');

  useEffect(() => {
    if (queryCheck === null) {
      setQuery('');
    }
  }, [queryCheck]);

  const applyQuery = useCallback(debounce(setSearchParams, 1000), [pathname]);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    if (!newQuery) {
      setQuery('');
      applyQuery(getSearchWith(
        searchParams, { query: null },
      ));

      return;
    }

    setQuery(newQuery);
    applyQuery(getSearchWith(
      searchParams, { query: newQuery },
    ));
  };

  const searchVisible = pathname === '/favourites' || pathname === '/tablets' || pathname === '/accessories' || pathname === '/phones';

  const getLinkClassNav = (
    { isActive }: { isActive: boolean },
  ) => classNames('nav-item',
    { 'is-active': isActive });

  const getLinkClassFav = (
    { isActive }: { isActive: boolean },
  ) => classNames('header__favorite',
    { 'is-active': isActive });

  const getLinkClassCart = (
    { isActive }: { isActive: boolean },
  ) => classNames('header__cart',
    { 'is-active': isActive });

  const itemCount = cart.reduce((total, item) => {
    return total + +item.quantity;
  }, 0);

  const handleRemoveQuery = () => {
    setQuery('');
    applyQuery(getSearchWith(
      searchParams, { query: null },
    ));
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <header className="header">
      <section className="header__leftSide">
        <Link to="/" className="header__logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24" fill="none">
            <path d="M2.93333 15.0966V7.25442H0V17.7306H6.65986V15.0966H2.93333Z" fill="#313237" />
            <path d="M11.6842 18C15.0516 18 17.4461 15.7102 17.4461 12.5075C17.4461 9.2898 15.0516 7 11.6842 7C8.31688 7 5.92232 9.30476 5.92232 12.5075C5.92232 15.6952 8.31688 18 11.6842 18ZM11.6842 15.3211C10.0978 15.3211 8.91552 14.1238 8.91552 12.5075C8.91552 10.8762 10.0978 9.67891 11.6842 9.67891C13.2856 9.67891 14.438 10.8612 14.438 12.5075C14.438 14.1388 13.2856 15.3211 11.6842 15.3211Z" fill="#313237" />
            <path d="M22.535 12.1333V13.9592H25.1391C24.8099 14.7673 23.867 15.3061 22.7595 15.3061C21.1731 15.3061 20.1405 14.1687 20.1405 12.5075C20.1405 10.8313 21.1881 9.69388 22.7595 9.69388C23.8221 9.69388 24.765 10.2626 25.1391 11.1456H28.1772C27.7282 8.72109 25.4833 7 22.7296 7C19.5119 7 17.1772 9.31973 17.1772 12.5075C17.1772 15.6952 19.5568 18 22.7595 18C26.0371 18 28.282 15.5605 28.282 12.1333H22.535Z" fill="#313237" />
            <path d="M33.7555 18C37.1229 18 39.5175 15.7102 39.5175 12.5075C39.5175 9.2898 37.1229 7 33.7555 7C30.3882 7 27.9936 9.30476 27.9936 12.5075C27.9936 15.6952 30.3882 18 33.7555 18ZM33.7555 15.3211C32.1692 15.3211 30.9868 14.1238 30.9868 12.5075C30.9868 10.8762 32.1692 9.67891 33.7555 9.67891C35.3569 9.67891 36.5093 10.8612 36.5093 12.5075C36.5093 14.1388 35.3569 15.3211 33.7555 15.3211Z" fill="#313237" />
          </svg>
        </Link>

        {pathname !== '/cart' && (
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav-link">
                <NavLink
                  to="/"
                  className={getLinkClassNav}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink
                  to="/phones"
                  className={getLinkClassNav}
                >
                  Phones
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink
                  to="/tablets"
                  className={getLinkClassNav}
                >
                  Tablets
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink
                  to="/accessories"
                  className={getLinkClassNav}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        )}

      </section>

      <section className="header__rightSide">
        {searchVisible && (
          <div className="header__search">
            <input
              className="header__search-input"
              type="text"
              value={query}
              placeholder="Search in phones..."
              onChange={handleQuery}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />

            {(!query || !isFocused) && (
              <div className="header__search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.66683 7.33334C2.66683 4.75601 4.75617 2.66668 7.3335 2.66668C9.91083 2.66668 12.0002 4.75601 12.0002 7.33334C12.0002 8.59061 11.503 9.73176 10.6945 10.5709C10.6716 10.5884 10.6497 10.6077 10.6287 10.6286C10.6078 10.6495 10.5886 10.6715 10.571 10.6943C9.73189 11.5028 8.59075 12 7.3335 12C4.75617 12 2.66683 9.91067 2.66683 7.33334ZM11.0786 12.0213C10.0522 12.8424 8.75016 13.3333 7.3335 13.3333C4.01979 13.3333 1.3335 10.6471 1.3335 7.33334C1.3335 4.01963 4.01979 1.33334 7.3335 1.33334C10.6472 1.33334 13.3335 4.01963 13.3335 7.33334C13.3335 8.75003 12.8425 10.052 12.0214 11.0785L14.4715 13.5286C14.7319 13.789 14.7319 14.2111 14.4715 14.4714C14.2112 14.7318 13.7891 14.7318 13.5287 14.4714L11.0786 12.0213Z" fill="#333333" />
                </svg>
              </div>
            )}

            {(isFocused && query) && (
              <button
                type="button"
                className="header__search-remove"
                onClick={handleRemoveQuery}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 4.47138C12.7319 4.21103 12.7319 3.78892 12.4716 3.52858C12.2112 3.26823 11.7891 3.26823 11.5288 3.52858L8.00016 7.05717L4.47157 3.52858C4.21122 3.26823 3.78911 3.26823 3.52876 3.52858C3.26841 3.78892 3.26841 4.21103 3.52876 4.47138L7.05735 7.99998L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.94279L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99998L12.4716 4.47138Z" fill="#313237" />
                </svg>
              </button>
            )}
          </div>
        )}

        {pathname !== '/cart' && (
          <NavLink
            to="/favourites"
            className={getLinkClassFav}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 1.63137C10.1584 1.4118 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.4118 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98394 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66667C15.6679 6.24028 15.5549 6.80827 15.3353 7.33819C15.1158 7.86806 14.794 8.34949 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.82501 0.33252 5.66667C0.33252 4.50833 0.792668 3.39743 1.61174 2.57836C2.43081 1.75929 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75929 7.78835 2.57836L8.00005 2.79005L8.21162 2.57847C8.21158 2.57851 8.21166 2.57844 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07392 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07392 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.56831C6.24189 3.01179 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01179 2.60169 3.56831C2.04517 4.12483 1.73252 4.87963 1.73252 5.66667C1.73252 6.4537 2.04517 7.20851 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48953 13.8928 7.16231 14.042 6.80228C14.1911 6.44226 14.2679 6.05637 14.2679 5.66667C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17103 13.6739 3.84369 13.3983 3.56819Z" fill="#333333" />
            </svg>
            {favourites.length > 0 && (
              <div className="header__favorite-number">
                {favourites.length}
              </div>
            )}
          </NavLink>
        )}

        <NavLink to="/cart" className={getLinkClassCart}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.46683 0.933323C2.59273 0.765453 2.79032 0.666656 3.00016 0.666656H11.0002C11.21 0.666656 11.4076 0.765453 11.5335 0.933323L13.5335 3.59999C13.62 3.71539 13.6668 3.85574 13.6668 3.99999V13.3333C13.6668 13.8638 13.4561 14.3725 13.081 14.7475C12.706 15.1226 12.1973 15.3333 11.6668 15.3333H2.3335C1.80306 15.3333 1.29436 15.1226 0.919282 14.7475C0.54421 14.3725 0.333496 13.8638 0.333496 13.3333V3.99999C0.333496 3.85574 0.380281 3.71539 0.466829 3.59999L2.46683 0.933323ZM3.3335 1.99999L1.66683 4.22221V13.3333C1.66683 13.5101 1.73707 13.6797 1.86209 13.8047C1.98712 13.9298 2.15669 14 2.3335 14H11.6668C11.8436 14 12.0132 13.9298 12.1382 13.8047C12.2633 13.6797 12.3335 13.5101 12.3335 13.3333V4.22221L10.6668 1.99999H3.3335Z" fill="#313237" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0.333496 4.00001C0.333496 3.63182 0.631973 3.33334 1.00016 3.33334H13.0002C13.3684 3.33334 13.6668 3.63182 13.6668 4.00001C13.6668 4.3682 13.3684 4.66668 13.0002 4.66668H1.00016C0.631973 4.66668 0.333496 4.3682 0.333496 4.00001Z" fill="#313237" />
            <path fillRule="evenodd" clipRule="evenodd" d="M4.33341 6C4.7016 6 5.00008 6.29848 5.00008 6.66667C5.00008 7.1971 5.21079 7.70581 5.58587 8.08088C5.96094 8.45595 6.46965 8.66667 7.00008 8.66667C7.53051 8.66667 8.03922 8.45595 8.41429 8.08088C8.78937 7.70581 9.00008 7.1971 9.00008 6.66667C9.00008 6.29848 9.29856 6 9.66675 6C10.0349 6 10.3334 6.29848 10.3334 6.66667C10.3334 7.55072 9.98222 8.39857 9.3571 9.02369C8.73198 9.64881 7.88414 10 7.00008 10C6.11603 10 5.26818 9.64881 4.64306 9.02369C4.01794 8.39857 3.66675 7.55072 3.66675 6.66667C3.66675 6.29848 3.96522 6 4.33341 6Z" fill="#313237" />
          </svg>
          {cart.length > 0 && (
            <div className="header__favorite-number">
              {itemCount}
            </div>
          )}
        </NavLink>
      </section>
    </header>
  );
};
