import classNames from 'classnames';
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import { Search } from '../../helpers/Search/Search';

export const Header: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(useLocation().search);
  const pathname = location.pathname.split('/');
  let parseFavourites = [];

  if (localStorage.getItem('favourites')) {
    parseFavourites = JSON.parse(localStorage.getItem('favourites') || '');
  }

  let parseCarts = [];

  if (localStorage.getItem('carts')) {
    parseCarts = JSON.parse(localStorage.getItem('carts') || '');
  }

  useEffect(() => {}, [searchParams]);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__content">
          <NavLink className="header__logo" to="/">
            <svg
              width="40"
              height="11"
              viewBox="0 0 40 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.93333 8.0966V0.254421H0V10.7306H6.65986V8.0966H2.93333Z"
                fill="#313237"
              />
              <path
                d="M11.6842 11C15.0516 11 17.4461 8.7102 17.4461
                5.50748C17.4461 2.2898 15.0516 0 11.6842 0C8.31688 0
                5.92232 2.30476 5.92232 5.50748C5.92232 8.69524 8.31688
                11 11.6842 11ZM11.6842 8.32109C10.0978 8.32109 8.91552
                7.12381 8.91552 5.50748C8.91552 3.87619 10.0978 2.67891
                11.6842 2.67891C13.2856 2.67891 14.438 3.86122 14.438
                5.50748C14.438 7.13878 13.2856 8.32109 11.6842 8.32109Z"
                fill="#313237"
              />
              <path
                d="M22.535 5.13333V6.95918H25.1391C24.8099 7.76735
                23.867 8.30612 22.7595 8.30612C21.1731 8.30612 20.1405
                7.16871 20.1405 5.50748C20.1405 3.83129 21.1881 2.69388
                22.7595 2.69388C23.8221 2.69388 24.765 3.26258 25.1391
                4.14558H28.1772C27.7282 1.72109 25.4833 0 22.7296 0C19.5119
                0 17.1772 2.31973 17.1772 5.50748C17.1772 8.69524 19.5568
                11 22.7595 11C26.0371 11 28.282 8.56054 28.282 5.13333H22.535Z"
                fill="#313237"
              />
              <path
                d="M33.7555 11C37.1229 11 39.5175 8.7102 39.5175
                5.50748C39.5175 2.2898 37.1229 0 33.7555 0C30.3882 0
                27.9936 2.30476 27.9936 5.50748C27.9936 8.69524 30.3882 11
                33.7555 11ZM33.7555 8.32109C32.1692 8.32109 30.9868 7.12381
                30.9868 5.50748C30.9868 3.87619 32.1692 2.67891 33.7555
                2.67891C35.3569 2.67891 36.5093 3.86122 36.5093 5.50748C36.5093
                7.13878 35.3569 8.32109 33.7555 8.32109Z"
                fill="#313237"
              />
            </svg>
          </NavLink>
          <nav className="header__nav">
            <ul className="header__list">
              <li className="header__item">
                <NavLink
                  to="/"
                  className="header__link"
                >
                  <p className={classNames('header__name', {
                    'header__name--focus': location.pathname === '/',
                  })}
                  >
                    HOME
                  </p>
                </NavLink>
              </li>
              <li className="header__item">
                <NavLink
                  to="/phones"
                  className="header__link"
                >
                  <p className={classNames('header__name', {
                    'header__name--focus': location.pathname === '/phones',
                  })}
                  >
                    PHONES
                  </p>

                </NavLink>
              </li>
              <li className="header__item">
                <NavLink
                  to="/tablets"
                  className="header__link"
                >
                  <p className={classNames('header__name', {
                    'header__name--focus': location.pathname === '/tablets',
                  })}
                  >
                    TABLETS
                  </p>

                </NavLink>
              </li>
              <li className="header__item">
                <NavLink
                  to="/accessories"
                  className="header__link"
                >
                  <p className={classNames('header__name', {
                    'header__name--focus': location.pathname === '/accessories',
                  })}
                  >
                    ACCESSORIES
                  </p>

                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header__icons">
          {pathname.length === 2 && pathname[1] === 'phones' && <Search />}
          {pathname.length === 2 && pathname[1] === 'tablets' && <Search />}
          {pathname.length === 2 && pathname[1] === 'accessories' && <Search />}
          {pathname.length === 2 && pathname[1] === 'favourites' && <Search />}
          <NavLink
            to="/favourites"
          >
            <button
              type="button"
              className={classNames('header__favourites', {
                'header__icons--focus': location.pathname === '/favourites',
              })}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {parseFavourites.length !== 0
                && (
                  <div className="header__push">
                    {parseFavourites.length}
                  </div>
                )}
            </button>
          </NavLink>
          <NavLink
            to="/cart"
          >
            <button
              type="button"
              className={classNames('header__cart', {
                'header__icons--focus': location.pathname === '/cart',
              })}
              onClick={() => {
                window.scrollTo({ top: 0 });
              }}
            >
              {parseCarts.length !== 0
                && (
                  <div className="header__push">
                    {parseCarts.length}
                  </div>
                )}
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
