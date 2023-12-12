/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { NavBar } from '../NavBar';
import './Header.scss';
import { ProductsContext } from '../ProductsContext';

type Props = {
  toggleMenu: () => void,
};

export const Header: React.FC<Props> = ({ toggleMenu }) => {
  const { favorites, carts } = useContext(ProductsContext);

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo-nav-bar">
            <NavLink
              className="header__logo-link"
              to="/"
            >
              <div className="header__logo icon-logo" />
            </NavLink>

            <div className="header__nav">
              <NavBar />
            </div>
          </div>

          <div className="header__favorites-cart-wrapper">
            <NavLink
              className={({ isActive }) => (
                classNames('header__link', {
                  'header__link--is-active': isActive,
                })
              )}
              to="/favorites"
            >
              <div className="icon icon__favorites">
                <div
                  className={classNames(
                    'icon__label-count',
                    {
                      'icon__label-count--display-none':
                        favorites.length === 0,
                    },
                  )}
                >
                  {favorites.length}
                </div>
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) => (
                classNames('header__link', {
                  'header__link--is-active': isActive,
                })
              )}
              to="/cart"
            >
              <div className="icon icon__cart">
                <div
                  className={classNames(
                    'icon__label-count',
                    {
                      'icon__label-count--display-none':
                        carts.length === 0,
                    },
                  )}
                >
                  {carts.length}
                </div>
              </div>
            </NavLink>
          </div>

          <button
            className="header__menu"
            onClick={toggleMenu}
          >
            <div className="icon icon__menu" />
          </button>
        </div>
      </div>
    </header>
  );
};
