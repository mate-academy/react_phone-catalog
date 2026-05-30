/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React, { useContext } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { Search } from '../Search';
import { GeneralContext } from '../../helpers/GeneralContext';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'header__link', 'header__nav-link', 'nav__link', {
    'is-active': isActive,
  },
);

const getAdditionalLinkClass
= ({ isActive }: { isActive: boolean }) => classNames(
  'header__additional-link', {
    'is-active': isActive,
  },
);

export const Header: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { favouritesList, cartList } = useContext(GeneralContext);
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="header__wrapper">
        <nav className="header__nav nav">
          <NavLink
            to="/"
            className="header__nav--logo"
          >
            <img
              src={require('../../images/icons/Logo.svg').default}
              alt="Logo"
            />
          </NavLink>

          <NavLink
            to="/"
            className={getLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/phones"
            className={getLinkClass}
          >
            Phones
          </NavLink>

          <NavLink
            to="/tablets"
            className={getLinkClass}
          >
            Tablets
          </NavLink>

          <NavLink
            to="/accessories"
            className={getLinkClass}
          >
            Accessories
          </NavLink>
        </nav>

        <div className="header__additional-links">
          {pathname === '/phones' && <Search />}
          {pathname === '/tablets' && <Search />}
          {pathname === '/accessories' && <Search />}
          {pathname === '/favourities' && <Search />}

          <NavLink
            to="/favourities"
            className={getAdditionalLinkClass}
          >
            <img
              src={require('../../images/icons/favourities.svg').default}
              alt="Favorite"
            />

            {favouritesList.length > 0 && (
              <div className="header__counter">
                {favouritesList.length}
              </div>
            )}
          </NavLink>

          <NavLink
            to={{
              pathname: '/cart',
              search: searchParams.toString(),
            }}
            className={getAdditionalLinkClass}
          >
            <img
              src={require('../../images/icons/shopping-bag.svg').default}
              alt="Cart"
            />

            {cartList.length > 0 && (
              <div className="header__counter">
                {cartList.length}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
