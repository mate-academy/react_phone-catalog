import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import logo from '../images/Logo.svg';
import favIcon from '../images/icons/Favourites.svg';
import cart from '../images/icons/Cart.svg';
import { RootState } from '../Reducers/store';

export const Header: React.FC = () => {
  const favsList = useSelector((state: RootState) => state.favorites);
  const cartList = useSelector((state: RootState) => state.cart);

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo">
          <img
            src={logo}
            alt="logo"
          />
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
              home
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/phones"
              className={({ isActive }) => classNames(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              PHONES
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
              TABLETS
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
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header__buttons">
        {/* <SearchField /> */}

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
            // data-counter={`${favsList.length}`}
          >
            <img
              src={favIcon}
              alt="favorites"
              className="button__cart--image"
            />
            {favsList.length > 0 && (
              <span className="header__total-items">{favsList.length}</span>
            )}
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
            // data-counter={`${cartList.length}`}
          >
            <img
              src={cart}
              alt="cart"
              className="button__cart--image"
            />
            {cartList.length > 0 && (
              <span className="header__total-items">{cartList.length}</span>
            )}
          </button>
        </NavLink>
      </div>
    </header>
  );
};
