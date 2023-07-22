import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import classNames from 'classnames';
import logo from '../imgs/LOGO.svg';

import cart from '../imgs/icons/Shopping bag (Cart).svg';

import favsIcon from '../imgs/icons/Favourites (Heart Like).svg';
import { RootState } from '../Reducer/store';
import { SearchField } from './SearchField';

export const Header: React.FC = () => {
  const favsList = useSelector((state: RootState) => state.favorites);
  const cartList = useSelector((state: RootState) => state.cart);

  return (
    <div className="header" id="headerNavBar">
      <nav className="header__nav">
        <Link to="/" className="header__logo">
          <img src={logo} alt="" />
        </Link>

        <ul className="header__menu">
          <li className="header__item">
            <NavLink
              to="/"
              className={({ isActive }) => classNames(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Home
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/phones"
              className="header__link"
            >
              Phones
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/tablets"
              className={({ isActive }) => classNames(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Tablets
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/accessories"
              className={({ isActive }) => classNames(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header__buttons">
        <SearchField />

        <NavLink
          to="/favorites"
          className={({ isActive }) => classNames(
            'header__buttons--link',
            { 'header__buttons--link--active': isActive },
          )}
        >
          <button
            type="button"
            className="button button__cart"
            data-counter={`${favsList.length}`}
          >
            <img src={favsIcon} alt="" className="button__cart--image" />
          </button>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => classNames(
            'header__buttons--link',
            { 'header__buttons--link--active': isActive },
          )}
        >
          <button
            type="button"
            className="button button__cart"
            data-counter={`${cartList.length}`}
          >
            <img src={cart} alt="" className="button__cart--image" />
          </button>
        </NavLink>
      </div>
    </div>
  );
};
