/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import { PageNavLink } from './PageNavLink';
import { getSearchWith } from '../helpers/searchHelper';

export const Navbar = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const query = searchParams.get('query') || '';

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: e.currentTarget.value || null }),
    );
  };

  return (

    <header className="header">

      {pathname === '/phones'
        ? (
          <div className="header__wrapper header__wrapper--search">

            <Link
              to="../"
              className="grid__item grid__item--1-1 header__logo"
            >
              <svg width="40" height="11" viewBox="0 0 40 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.93333 8.0966V0.254421H0V10.7306H6.65986V8.0966H2.93333Z" fill="#313237" />
                <path d="M11.6842 11C15.0516 11 17.4461 8.7102 17.4461 5.50748C17.4461 2.2898 15.0516 0 11.6842 0C8.31688 0 5.92232 2.30476 5.92232 5.50748C5.92232 8.69524 8.31688 11 11.6842 11ZM11.6842 8.32109C10.0978 8.32109 8.91552 7.12381 8.91552 5.50748C8.91552 3.87619 10.0978 2.67891 11.6842 2.67891C13.2856 2.67891 14.438 3.86122 14.438 5.50748C14.438 7.13878 13.2856 8.32109 11.6842 8.32109Z" fill="#313237" />
                <path d="M22.535 5.13333V6.95918H25.1391C24.8099 7.76735 23.867 8.30612 22.7595 8.30612C21.1731 8.30612 20.1405 7.16871 20.1405 5.50748C20.1405 3.83129 21.1881 2.69388 22.7595 2.69388C23.8221 2.69388 24.765 3.26258 25.1391 4.14558H28.1772C27.7282 1.72109 25.4833 0 22.7296 0C19.5119 0 17.1772 2.31973 17.1772 5.50748C17.1772 8.69524 19.5568 11 22.7595 11C26.0371 11 28.282 8.56054 28.282 5.13333H22.535Z" fill="#313237" />
                <path d="M33.7555 11C37.1229 11 39.5175 8.7102 39.5175 5.50748C39.5175 2.2898 37.1229 0 33.7555 0C30.3882 0 27.9936 2.30476 27.9936 5.50748C27.9936 8.69524 30.3882 11 33.7555 11ZM33.7555 8.32109C32.1692 8.32109 30.9868 7.12381 30.9868 5.50748C30.9868 3.87619 32.1692 2.67891 33.7555 2.67891C35.3569 2.67891 36.5093 3.86122 36.5093 5.50748C36.5093 7.13878 35.3569 8.32109 33.7555 8.32109Z" fill="#313237" />
              </svg>
            </Link>

            <nav
              data-cy="nav"
              className="header__nav"
              role="navigation"
              aria-label="main navigation"

            >
              <PageNavLink
                to="/"
                text="Home"
                setMenuOpened={setMenuOpened}
              />
              <PageNavLink
                to="phones"
                text="Phones"
                setMenuOpened={setMenuOpened}
              />
              <PageNavLink
                to="tablets"
                text="Tablets"
                setMenuOpened={setMenuOpened}
              />
              <PageNavLink
                to="accesories"
                text="Accesories"
                setMenuOpened={setMenuOpened}
              />
            </nav>

            <div
              className={
                classNames(
                  'header__menu menu menu--mobile',
                  { 'menu-opened': menuOpened },
                )
              }
            >
              <div
                className="menu__btn"
                onClick={() => {
                  setMenuOpened((prevState) => !prevState);
                }}
              >
                <span />
              </div>
              <ul className="menu__box">

                <li>
                  <PageNavLink
                    to="/"
                    text="Home"
                    setMenuOpened={setMenuOpened}
                  />
                </li>

                <li>
                  <PageNavLink
                    to="phones"
                    text="Phones"
                    setMenuOpened={setMenuOpened}
                  />
                </li>

                <li>
                  <PageNavLink
                    to="tablets"
                    text="Tablets"
                    setMenuOpened={setMenuOpened}
                  />
                </li>

                <li>
                  <PageNavLink
                    to="accesories"
                    text="Accesories"
                    setMenuOpened={setMenuOpened}
                  />
                </li>

              </ul>
            </div>

            <input
              type="text"
              className="header__search body-text"
              placeholder="Search in phones..."
              value={query}
              onChange={onQueryChange}
            />

            <div className="header__icons">
              <NavLink
                to="../favourites"
                className={({ isActive }) => (
                  classNames('header__icon header__icon--search',
                    { 'header__icon--active': isActive })
                )}
              >
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.62852 0.631356C10.1584 0.411782 10.7264 0.298767 11.3 0.298767C11.8737 0.298767 12.4416 0.411782 12.9716 0.631356C13.5015 0.85093 13.983 1.17276 14.3885 1.57846C14.7941 1.98392 15.1158 2.46531 15.3353 2.99513C15.5549 3.52505 15.6679 4.09304 15.6679 4.66665C15.6679 5.24026 15.5549 5.80825 15.3353 6.33817C15.1158 6.86805 14.794 7.34947 14.3884 7.75496C14.3883 7.755 14.3884 7.75492 14.3884 7.75496L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75496C0.792668 6.93589 0.33252 5.82499 0.33252 4.66665C0.33252 3.50831 0.792668 2.39741 1.61174 1.57834C2.43081 0.759273 3.54171 0.299124 4.70005 0.299124C5.85839 0.299124 6.96928 0.759273 7.78835 1.57834L8.00005 1.79003L8.21162 1.57846C8.21166 1.57842 8.21158 1.5785 8.21162 1.57846C8.61711 1.17281 9.09865 0.850909 9.62852 0.631356ZM13.3983 2.56818C13.1228 2.29255 12.7957 2.0739 12.4357 1.92472C12.0756 1.77555 11.6898 1.69877 11.3 1.69877C10.9103 1.69877 10.5245 1.77555 10.1644 1.92472C9.80441 2.0739 9.4773 2.29255 9.2018 2.56818L8.49502 3.27496C8.22165 3.54833 7.77844 3.54833 7.50507 3.27496L6.7984 2.56829C6.24189 2.01177 5.48708 1.69912 4.70005 1.69912C3.91301 1.69912 3.15821 2.01177 2.60169 2.56829C2.04517 3.12481 1.73252 3.87961 1.73252 4.66665C1.73252 5.45369 2.04517 6.20849 2.60169 6.76501L8.00005 12.1634L13.3984 6.76501C13.674 6.48951 13.8928 6.16229 14.042 5.80227C14.1911 5.44224 14.2679 5.05635 14.2679 4.66665C14.2679 4.27695 14.1911 3.89106 14.042 3.53103C13.8928 3.17101 13.6739 2.84367 13.3983 2.56818Z"
                    fill="#333333"
                  />
                </svg>
              </NavLink>
              <NavLink
                to="../cart"
                className={({ isActive }) => (
                  classNames('header__icon header__icon--search',
                    { 'header__icon--active': isActive })
                )}
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M2.46683 0.933323C2.59273 0.765453 2.79032 0.666656 3.00016 0.666656H11.0002C11.21 0.666656 11.4076 0.765453 11.5335 0.933323L13.5335 3.59999C13.62 3.71539 13.6668 3.85574 13.6668 3.99999V13.3333C13.6668 13.8638 13.4561 14.3725 13.081 14.7475C12.706 15.1226 12.1973 15.3333 11.6668 15.3333H2.3335C1.80306 15.3333 1.29436 15.1226 0.919282 14.7475C0.54421 14.3725 0.333496 13.8638 0.333496 13.3333V3.99999C0.333496 3.85574 0.380281 3.71539 0.466829 3.59999L2.46683 0.933323ZM3.3335 1.99999L1.66683 4.22221V13.3333C1.66683 13.5101 1.73707 13.6797 1.86209 13.8047C1.98712 13.9298 2.15669 14 2.3335 14H11.6668C11.8436 14 12.0132 13.9298 12.1382 13.8047C12.2633 13.6797 12.3335 13.5101 12.3335 13.3333V4.22221L10.6668 1.99999H3.3335Z"
                    fill="#313237"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M0.333496 4.00001C0.333496 3.63182 0.631973 3.33334 1.00016 3.33334H13.0002C13.3684 3.33334 13.6668 3.63182 13.6668 4.00001C13.6668 4.3682 13.3684 4.66668 13.0002 4.66668H1.00016C0.631973 4.66668 0.333496 4.3682 0.333496 4.00001Z"
                    fill="#313237"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M4.33341 6C4.7016 6 5.00008 6.29848 5.00008 6.66667C5.00008 7.1971 5.21079 7.70581 5.58587 8.08088C5.96094 8.45595 6.46965 8.66667 7.00008 8.66667C7.53051 8.66667 8.03922 8.45595 8.41429 8.08088C8.78937 7.70581 9.00008 7.1971 9.00008 6.66667C9.00008 6.29848 9.29856 6 9.66675 6C10.0349 6 10.3334 6.29848 10.3334 6.66667C10.3334 7.55072 9.98222 8.39857 9.3571 9.02369C8.73198 9.64881 7.88414 10 7.00008 10C6.11603 10 5.26818 9.64881 4.64306 9.02369C4.01794 8.39857 3.66675 7.55072 3.66675 6.66667C3.66675 6.29848 3.96522 6 4.33341 6Z"
                    fill="#313237"
                  />
                </svg>
              </NavLink>
            </div>
          </div>
        )
        : (
          <div className="header__wrapper">

            <Link
              to="../"
              className="grid__item grid__item--1-1 header__logo"
            >
              <svg width="40" height="11" viewBox="0 0 40 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.93333 8.0966V0.254421H0V10.7306H6.65986V8.0966H2.93333Z" fill="#313237" />
                <path d="M11.6842 11C15.0516 11 17.4461 8.7102 17.4461 5.50748C17.4461 2.2898 15.0516 0 11.6842 0C8.31688 0 5.92232 2.30476 5.92232 5.50748C5.92232 8.69524 8.31688 11 11.6842 11ZM11.6842 8.32109C10.0978 8.32109 8.91552 7.12381 8.91552 5.50748C8.91552 3.87619 10.0978 2.67891 11.6842 2.67891C13.2856 2.67891 14.438 3.86122 14.438 5.50748C14.438 7.13878 13.2856 8.32109 11.6842 8.32109Z" fill="#313237" />
                <path d="M22.535 5.13333V6.95918H25.1391C24.8099 7.76735 23.867 8.30612 22.7595 8.30612C21.1731 8.30612 20.1405 7.16871 20.1405 5.50748C20.1405 3.83129 21.1881 2.69388 22.7595 2.69388C23.8221 2.69388 24.765 3.26258 25.1391 4.14558H28.1772C27.7282 1.72109 25.4833 0 22.7296 0C19.5119 0 17.1772 2.31973 17.1772 5.50748C17.1772 8.69524 19.5568 11 22.7595 11C26.0371 11 28.282 8.56054 28.282 5.13333H22.535Z" fill="#313237" />
                <path d="M33.7555 11C37.1229 11 39.5175 8.7102 39.5175 5.50748C39.5175 2.2898 37.1229 0 33.7555 0C30.3882 0 27.9936 2.30476 27.9936 5.50748C27.9936 8.69524 30.3882 11 33.7555 11ZM33.7555 8.32109C32.1692 8.32109 30.9868 7.12381 30.9868 5.50748C30.9868 3.87619 32.1692 2.67891 33.7555 2.67891C35.3569 2.67891 36.5093 3.86122 36.5093 5.50748C36.5093 7.13878 35.3569 8.32109 33.7555 8.32109Z" fill="#313237" />
              </svg>
            </Link>

            <nav
              data-cy="nav"
              className="header__nav"
              role="navigation"
              aria-label="main navigation"

            >
              <PageNavLink
                to="/"
                text="Home"
                setMenuOpened={setMenuOpened}
              />
              <PageNavLink
                to="phones"
                text="Phones"
                setMenuOpened={setMenuOpened}
              />
              <PageNavLink
                to="tablets"
                text="Tablets"
                setMenuOpened={setMenuOpened}
              />
              <PageNavLink
                to="accesories"
                text="Accesories"
                setMenuOpened={setMenuOpened}
              />
            </nav>

            <div
              className={
                classNames(
                  'header__menu menu menu--mobile',
                  { 'menu-opened': menuOpened },
                )
              }
            >
              <div
                className="menu__btn"
                onClick={() => {
                  setMenuOpened((prevState) => !prevState);
                }}
              >
                <span />
              </div>
              <ul className="menu__box">

                <li>
                  <PageNavLink
                    to="/"
                    text="Home"
                    setMenuOpened={setMenuOpened}
                  />
                </li>

                <li>
                  <PageNavLink
                    to="phones"
                    text="Phones"
                    setMenuOpened={setMenuOpened}
                  />
                </li>

                <li>
                  <PageNavLink
                    to="tablets"
                    text="Tablets"
                    setMenuOpened={setMenuOpened}
                  />
                </li>

                <li>
                  <PageNavLink
                    to="accesories"
                    text="Accesories"
                    setMenuOpened={setMenuOpened}
                  />
                </li>

              </ul>
            </div>

            <div className="header__icons">
              <NavLink
                to="../favourites"
                className={({ isActive }) => (
                  classNames('header__icon',
                    { 'header__icon--active': isActive })
                )}
              >
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.62852 0.631356C10.1584 0.411782 10.7264 0.298767 11.3 0.298767C11.8737 0.298767 12.4416 0.411782 12.9716 0.631356C13.5015 0.85093 13.983 1.17276 14.3885 1.57846C14.7941 1.98392 15.1158 2.46531 15.3353 2.99513C15.5549 3.52505 15.6679 4.09304 15.6679 4.66665C15.6679 5.24026 15.5549 5.80825 15.3353 6.33817C15.1158 6.86805 14.794 7.34947 14.3884 7.75496C14.3883 7.755 14.3884 7.75492 14.3884 7.75496L8.49502 13.6483C8.22165 13.9217 7.77844 13.9217 7.50507 13.6483L1.61174 7.75496C0.792668 6.93589 0.33252 5.82499 0.33252 4.66665C0.33252 3.50831 0.792668 2.39741 1.61174 1.57834C2.43081 0.759273 3.54171 0.299124 4.70005 0.299124C5.85839 0.299124 6.96928 0.759273 7.78835 1.57834L8.00005 1.79003L8.21162 1.57846C8.21166 1.57842 8.21158 1.5785 8.21162 1.57846C8.61711 1.17281 9.09865 0.850909 9.62852 0.631356ZM13.3983 2.56818C13.1228 2.29255 12.7957 2.0739 12.4357 1.92472C12.0756 1.77555 11.6898 1.69877 11.3 1.69877C10.9103 1.69877 10.5245 1.77555 10.1644 1.92472C9.80441 2.0739 9.4773 2.29255 9.2018 2.56818L8.49502 3.27496C8.22165 3.54833 7.77844 3.54833 7.50507 3.27496L6.7984 2.56829C6.24189 2.01177 5.48708 1.69912 4.70005 1.69912C3.91301 1.69912 3.15821 2.01177 2.60169 2.56829C2.04517 3.12481 1.73252 3.87961 1.73252 4.66665C1.73252 5.45369 2.04517 6.20849 2.60169 6.76501L8.00005 12.1634L13.3984 6.76501C13.674 6.48951 13.8928 6.16229 14.042 5.80227C14.1911 5.44224 14.2679 5.05635 14.2679 4.66665C14.2679 4.27695 14.1911 3.89106 14.042 3.53103C13.8928 3.17101 13.6739 2.84367 13.3983 2.56818Z"
                    fill="#333333"
                  />
                </svg>
              </NavLink>
              <NavLink
                to="../cart"
                className={({ isActive }) => (
                  classNames('header__icon',
                    { 'header__icon--active': isActive })
                )}
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M2.46683 0.933323C2.59273 0.765453 2.79032 0.666656 3.00016 0.666656H11.0002C11.21 0.666656 11.4076 0.765453 11.5335 0.933323L13.5335 3.59999C13.62 3.71539 13.6668 3.85574 13.6668 3.99999V13.3333C13.6668 13.8638 13.4561 14.3725 13.081 14.7475C12.706 15.1226 12.1973 15.3333 11.6668 15.3333H2.3335C1.80306 15.3333 1.29436 15.1226 0.919282 14.7475C0.54421 14.3725 0.333496 13.8638 0.333496 13.3333V3.99999C0.333496 3.85574 0.380281 3.71539 0.466829 3.59999L2.46683 0.933323ZM3.3335 1.99999L1.66683 4.22221V13.3333C1.66683 13.5101 1.73707 13.6797 1.86209 13.8047C1.98712 13.9298 2.15669 14 2.3335 14H11.6668C11.8436 14 12.0132 13.9298 12.1382 13.8047C12.2633 13.6797 12.3335 13.5101 12.3335 13.3333V4.22221L10.6668 1.99999H3.3335Z"
                    fill="#313237"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M0.333496 4.00001C0.333496 3.63182 0.631973 3.33334 1.00016 3.33334H13.0002C13.3684 3.33334 13.6668 3.63182 13.6668 4.00001C13.6668 4.3682 13.3684 4.66668 13.0002 4.66668H1.00016C0.631973 4.66668 0.333496 4.3682 0.333496 4.00001Z"
                    fill="#313237"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M4.33341 6C4.7016 6 5.00008 6.29848 5.00008 6.66667C5.00008 7.1971 5.21079 7.70581 5.58587 8.08088C5.96094 8.45595 6.46965 8.66667 7.00008 8.66667C7.53051 8.66667 8.03922 8.45595 8.41429 8.08088C8.78937 7.70581 9.00008 7.1971 9.00008 6.66667C9.00008 6.29848 9.29856 6 9.66675 6C10.0349 6 10.3334 6.29848 10.3334 6.66667C10.3334 7.55072 9.98222 8.39857 9.3571 9.02369C8.73198 9.64881 7.88414 10 7.00008 10C6.11603 10 5.26818 9.64881 4.64306 9.02369C4.01794 8.39857 3.66675 7.55072 3.66675 6.66667C3.66675 6.29848 3.96522 6 4.33341 6Z"
                    fill="#313237"
                  />
                </svg>
              </NavLink>
            </div>
          </div>
        )}
    </header>
  );
};
