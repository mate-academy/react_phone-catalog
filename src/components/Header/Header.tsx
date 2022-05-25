import React from 'react';
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import { Navigation } from '../Navigation';
import './Header.scss';

export const Header: React.FC = React.memo(
  () => {
    return (
      <header className="header App__header" id="header">
        <div className="header__nav-block">
          <div className="navbar header__navbar">
            <div className="logo-box header__logo-box logo-box--header">
              <Link to="/" className="logo" />
            </div>

            <Navigation />
          </div>

          <div className="order-info header__order-info">
            <NavLink
              to="/favorites"
              className={isActive => (
                classNames(
                  'order-info__link',
                  { 'order-info__link--is-selected': isActive },
                )
              )}
            >
              <span
                className="order-info__item order-info__item--bg-favourites"
              />
            </NavLink>

            <NavLink
              to="/cart"
              className={isActive => (
                classNames(
                  'order-info__link',
                  { 'order-info__link--is-selected': isActive },
                )
              )}
            >
              <span className="order-info__item order-info__item--bg-cart">
                <span className="cart__count">0</span>
              </span>

            </NavLink>

          </div>
        </div>
      </header>
    );
  },
);
