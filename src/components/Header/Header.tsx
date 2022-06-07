import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Navigation } from '../Navigation';
import './Header.scss';
import { Search } from '../Search';

type Props = {
  quantity: number;
  favourites: number;
};

export const Header: React.FC<Props> = React.memo(
  ({ quantity, favourites }) => {
    const [isVisibleSearchPanel, setIsVisibleSearchPanel] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
      switch (pathname) {
        case '/phones': case '/tablets': case '/accessories': case '/favorites':
          setIsVisibleSearchPanel(true);
          break;
        default:
          setIsVisibleSearchPanel(false);
      }
    }, [pathname]);

    return (
      <header className="header App__header" id="header">
        <div className="header__nav-block">
          <div className="navbar header__navbar">
            <div className="logo-box header__logo-box logo-box--header">
              <Link to="/" className="logo" />
            </div>
            {!pathname.includes('/cart') && <Navigation />}
          </div>

          <div className="order-info header__order-info">
            {isVisibleSearchPanel && (
              <div className="header__search-block">
                <Search />
              </div>
            )}
            {!pathname.includes('/cart') && (
              <NavLink
                to="/favorites"
                className={({ isActive }) => (
                  classNames(
                    'order-info__link',
                    { 'order-info__link--is-selected': isActive },
                  )
                )}
              >
                <span
                  className="order-info__item order-info__item--bg-favourites"
                >
                  {favourites > 0
                    && <span className="order-info__count">{favourites}</span>}
                </span>
              </NavLink>
            )}

            <NavLink
              to="/cart"
              className={({ isActive }) => (
                classNames(
                  'order-info__link',
                  { 'order-info__link--is-selected': isActive },
                )
              )}
            >
              <span className="order-info__item order-info__item--bg-cart">
                {quantity > 0
                  && <span className="order-info__count">{quantity}</span>}
              </span>

            </NavLink>

          </div>
        </div>
      </header>
    );
  },
);
