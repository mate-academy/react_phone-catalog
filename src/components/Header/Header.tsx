/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { NavBar } from '../NavBar';
import './Header.scss';
import { ProductsContext } from '../ProductsContext';
import { SearchBar } from '../SearchBar';

type Props = {
  toggleMenu: () => void,
};

export const Header: React.FC<Props> = ({ toggleMenu }) => {
  const { favorites, carts } = useContext(ProductsContext);
  const totalItems = carts.reduce(
    (accumulator, currentItem) => (
      accumulator + currentItem.quantity
    ), 0,
  );

  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const location = useLocation();
  const namePage = location.pathname.split('/')[1];

  useEffect(() => {
    setIsSearchBarActive(
      namePage === 'phones'
      || namePage === 'tablets'
      || namePage === 'accessories',
    );
  }, [location.pathname]);

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

          <div className="header__rigth-part">
            {isSearchBarActive && (
              <SearchBar
                className="header__search-bar"
                sectionName={namePage}
              />
            )}

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
                          totalItems === 0,
                      },
                    )}
                  >
                    {totalItems}
                  </div>
                </div>
              </NavLink>
            </div>
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
