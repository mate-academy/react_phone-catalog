import React, { useState } from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { getActiveClassName } from '../../helpers/utils/getActiveClassName';

const Header: React.FC = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleToggleNav = () => {
    setOpenNav(prevState => !prevState);
  };

  return (
    <>
      <div className="header__phone-open-nav">
        <NavLink to="/" className="header__phone-open-nav__logo" />
        { /* eslint-disable-next-line */}
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
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => getActiveClassName(
                  'header__nav-link',
                  isActive,
                )}
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
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header__cart">
          <NavLink
            to="/search"
            className={({ isActive }) => getActiveClassName(
              'header__cart-link',
              isActive,
              ['header__cart-link--search'],
            )}
          />
          <NavLink
            to="/favourites"
            className={({ isActive }) => getActiveClassName(
              'header__cart-link',
              isActive,
              ['header__cart-link--favourites'],
            )}
          />
          <NavLink
            to="/cart"
            className={({ isActive }) => getActiveClassName(
              'header__cart-link',
              isActive,
              ['header__cart-link--cart'],
            )}
          />

        </div>
      </header>
    </>
  );
};

export default Header;
