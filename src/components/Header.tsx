import React, { useContext, useEffect, useState } from 'react';
import '../styles/components/Header.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from './ContextProvider';
import { Notification } from './Notification';

export const Header: React.FC = () => {
  const {
    cart,
    favorite,
    notification,
    query,
    setQuery,
  } = useContext(Context);
  const location = useLocation();
  const currentPage = location.pathname.slice(1);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (
      currentPage === 'phones'
      || currentPage === 'tablets'
      || currentPage === 'accessories'
    ) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [currentPage]);

  const cartQuantity = cart
    ?.map(product => product.quantity)
    .reduce((a, b) => a + b);

  const favoriteQuantity = favorite
    ? favorite.length
    : null;

  return (
    <header className="header" id="header">
      <div className="header__container">
        {notification && <Notification />}
        <div className="header__left">
          <div className="header__logo">
            <Link
              to="/"
              className="logo"
            >
              <img
                src="/assets/logo.svg"
                alt="logo"
                className="logo__image"
              />
            </Link>
          </div>
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className={({ isActive }) => classNames('nav__link', {
                    'nav__link--selected': isActive,
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/phones"
                  className={({ isActive }) => classNames('nav__link', {
                    'nav__link--selected': isActive,
                  })}
                >
                  Phones
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/tablets"
                  className={({ isActive }) => classNames('nav__link', {
                    'nav__link--selected': isActive,
                  })}
                >
                  Tablets
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/accessories"
                  className={({ isActive }) => classNames('nav__link', {
                    'nav__link--selected': isActive,
                  })}
                >
                  Accesories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header__right">
          {showSearch && (
            <label htmlFor="#search" className="header__search">
              <input
                type="text"
                className="header__input"
                placeholder={`Search in ${currentPage} ...`}
                id="#search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button
                  type="button"
                  className="header__clear-search"
                  onClick={() => setQuery('')}
                  data-cy="searchDelete"
                >
                  <img src="../assets/cross.svg" alt="clear" />
                </button>
              )}
              <img src="../assets/search.svg" alt="search" />
            </label>
          )}
          <NavLink
            to="/favorites"
            className="button header__button"
          >
            <div className="button__icon">
              <img
                src="/assets/favorites.svg"
                alt="icon"
              />
              {favoriteQuantity && (
                <span className="button__quantity">
                  {favoriteQuantity}
                </span>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className="button header__button"
          >
            <div className="button__icon">
              <img
                src="/assets/cart.svg"
                alt="icon"
              />
              {cartQuantity && (
                <span className="button__quantity">
                  {cartQuantity}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
