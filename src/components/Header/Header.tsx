import classNames from 'classnames';
import React, { useContext } from 'react';
import {
  Link, NavLink, useLocation,
} from 'react-router-dom';
import { CartContext } from '../CartContext';
import { FavContext } from '../FavContext';
import { Search } from '../Search';
import './Header.scss';

export const Header: React.FC = () => {
  const { pathname, search } = useLocation();
  const { favs } = useContext(FavContext);
  const { cart } = useContext(CartContext);

  const showSearchInput
    = pathname === '/phones'
    || pathname === '/tablets'
    || pathname === '/accessories'
    || pathname === '/favorites';

  return (
    <header className="header">
      <div className="header__left">
        <Link
          to="/"
          className="logo"
        >
          <img src="img/main-logo/logo.svg" alt="" />
        </Link>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                to="/"
                className={
                  ({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={{
                  pathname: '/phones',
                  search,
                }}
                className={
                  ({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )
                }
              >
                Phones
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={{
                  pathname: '/tablets',
                  search,
                }}
                className={
                  ({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={{
                  pathname: '/accessories',
                  search,
                }}
                className={
                  ({ isActive }) => classNames(
                    'nav__link',
                    { 'nav__link--active': isActive },
                  )
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__right">
        {showSearchInput && <Search />}
        <div className="header__button">
          <NavLink
            to="/favorites"
            className={
              ({ isActive }) => classNames(
                'header__button--link',
                'header__button--favorites',
                { 'header__button--active': isActive },
              )
            }
          />
          {favs.length > 0 && (
            <span className="header__button--count">
              {favs.length}
            </span>
          )}
        </div>
        <div className="header__button">
          <NavLink
            to="/cart"
            className={
              ({ isActive }) => classNames(
                'header__button--link',
                'header__button--cart',
                { 'header__button--active': isActive },
              )
            }
          />
          {cart.length > 0 && (
            <span className="header__button--count">
              {cart.length}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
