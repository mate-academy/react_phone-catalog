import React, { useState, useEffect } from 'react';
import './Header.scss';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { getActiveClassName } from '../../helpers/utils/getActiveClassName';
import { Search } from '../Search';
import { useAppSelector } from '../../api/hooks';

const Header: React.FC = () => {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.replaceAll('/', '');

  const handleToggleNav = () => {
    const width = window.innerWidth;

    if (width <= 768) {
      setOpenNav(prevState => !prevState);
    }
  };

  const favouritesCount = useAppSelector(state => {
    return state.favourites.favourites.length;
  });

  const cartCount = useAppSelector(({ cart }) => {
    const { items } = cart;

    return items.reduce((acc, item) => acc + (item.amount || 0), 0);
  });

  useEffect(() => {
    if (openNav) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [openNav]);

  return (
    <>
      <div className="header__phone-open-nav">
        <NavLink to="/" className="header__phone-open-nav__logo" />
        <NavLink
          to="/favourites"
          className="header__phone-open-nav__link
          header__phone-open-nav__link--favourites"
        >
          {favouritesCount > 0 && (
            <div className="header__phone-open-nav__quantity">
              {favouritesCount}
            </div>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className="header__phone-open-nav__link
          header__phone-open-nav__link--cart"
        >
          {cartCount > 0 && (
            <div className="header__phone-open-nav__quantity">
              {cartCount}
            </div>
          )}
        </NavLink>
        {/* eslint-disable-next-line */}
        <button
          className={cn('header__phone-open-nav__button', {
            'header__phone-open-nav__button--close': openNav,
          })}
          onClick={() => handleToggleNav()}
        />
      </div>
      <header
        className={cn('header', {
          'header--active': openNav,
        })}
      >
        <nav className="header__nav">
          <NavLink to="/" className="header__nav-logo" />
          {currentPath !== 'cart' && (
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => getActiveClassName(
                    'header__nav-link',
                    isActive,
                  )}
                  onClick={handleToggleNav}
                >
                  Home
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink
                  to="/phones"
                  className={({ isActive }) => getActiveClassName(
                    'header__nav-link',
                    isActive,
                  )}
                  onClick={handleToggleNav}
                >
                  Phones
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink
                  to="/tablets"
                  className={({ isActive }) => getActiveClassName(
                    'header__nav-link',
                    isActive,
                  )}
                  onClick={handleToggleNav}
                >
                  Tablets
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink
                  to="/accessories"
                  className={({ isActive }) => getActiveClassName(
                    'header__nav-link',
                    isActive,
                  )}
                  onClick={handleToggleNav}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
        <div className="header__cart">
          <Search />
          {currentPath !== 'cart' && (
            <NavLink
              to="/favourites"
              className={({ isActive }) => getActiveClassName(
                'header__cart-link',
                isActive,
                ['header__cart-link--favourites'],
              )}
            >
              {favouritesCount > 0 && (
                <div className="header__cart__quantity">
                  {favouritesCount}
                </div>
              )}
            </NavLink>
          )}
          <NavLink
            to="/cart"
            className={({ isActive }) => getActiveClassName(
              'header__cart-link',
              isActive,
              ['header__cart-link--cart'],
            )}
          >
            {cartCount > 0 && (
              <div className="header__cart__quantity">
                {cartCount}
              </div>
            )}
          </NavLink>
        </div>
      </header>
    </>
  );
};

export default Header;
