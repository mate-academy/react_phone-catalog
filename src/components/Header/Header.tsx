import React, { useContext, useEffect, useState } from 'react';
import './Header.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from '../../helpers/ContextProvider';
import { Notification } from '../Notification/Notification';

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
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  useEffect(() => {
    setMobileNavVisible(false);
  }, [location]);

  const setBodyOverflow = () => {
    if (mobileNavVisible) {
      document.body.classList.add('with-menu');

      return;
    }

    document.body.classList.remove('with-menu');
  };

  useEffect(() => {
    setBodyOverflow();
  }, [mobileNavVisible]);

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
                src="./assets/logo.svg"
                alt="logo"
                className="logo__image"
              />
            </Link>
          </div>
          <div className="header__nav">
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
                  <img src="./assets/cross.svg" alt="clear" />
                </button>
              )}
              <img src="./assets/search.svg" alt="search" />
            </label>
          )}
          <button
            type="button"
            className="button header__burger"
            onClick={() => setMobileNavVisible(prev => !prev)}
          >
            <img
              src="./assets/burger.svg"
              alt="menu"
            />
          </button>
          <NavLink
            to="/favorites"
            className={({ isActive }) => classNames('button header__button', {
              'header__button--is-active': isActive,
            })}
          >
            <div className="button__icon">
              <img
                src="./assets/favorites.svg"
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
            className={({ isActive }) => classNames('button header__button', {
              'header__button--is-active': isActive,
            })}
          >
            <div className="button__icon">
              <img
                src="./assets/cart.svg"
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

      <nav
        className={classNames('nav-mobile', {
          'nav-mobile--visible': mobileNavVisible,
        })}
      >
        <button
          type="button"
          className="button nav-mobile__close"
          onClick={() => setMobileNavVisible(false)}
        >
          <img src="./assets/close.svg" alt="close" />
        </button>
        <ul className="nav-mobile__list">
          <li className="nav-mobile__item">
            <NavLink
              to="/"
              className={({ isActive }) => classNames('nav-mobile__link', {
                'nav-mobile__link--selected': isActive,
              })}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-mobile__item">
            <NavLink
              to="/phones"
              className={({ isActive }) => classNames('nav-mobile__link', {
                'nav-mobile__link--selected': isActive,
              })}
            >
              Phones
            </NavLink>
          </li>
          <li className="nav-mobile__item">
            <NavLink
              to="/tablets"
              className={({ isActive }) => classNames('nav-mobile__link', {
                'nav-mobile__link--selected': isActive,
              })}
            >
              Tablets
            </NavLink>
          </li>
          <li className="nav-mobile__item">
            <NavLink
              to="/accessories"
              className={({ isActive }) => classNames('nav-mobile__link', {
                'nav-mobile__link--selected': isActive,
              })}
            >
              Accessories
            </NavLink>
          </li>
          <li className="nav-mobile__item">
            <NavLink
              to="/favorites"
              className={({ isActive }) => classNames('nav-mobile__link', {
                'nav-mobile__link--selected': isActive,
              })}
            >
              Favorites
            </NavLink>
          </li>
          <li className="nav-mobile__item">
            <NavLink
              to="/cart"
              className={({ isActive }) => classNames('nav-mobile__link', {
                'nav-mobile__link--selected': isActive,
              })}
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
