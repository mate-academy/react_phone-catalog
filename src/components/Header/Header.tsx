import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import cn from 'classnames';

import './Header.scss';
import { Search } from '../Search/Search';
import { usePhones } from '../../hooks/usePhones';

const getNavClass = ({ isActive }: { isActive: boolean }) => (cn('nav__link', {
  'nav__link--active': isActive,
}));

const getIconClass = ({ isActive }: { isActive: boolean }) => (cn(
  'header__icon',
  'icon',
  {
    'icon--active': isActive,
  },
));

export const Header: React.FC = () => {
  const location = useLocation();

  const {
    phoneSearchValue,
    setPhoneSearchValue,
    tabletSearchValue,
    setTabletSearchValue,
  } = usePhones();

  return (
    <header className="header">
      <div className="header__nav-wrapper">
        <Link to="/" className="header__logo logo">
          <img src="img/logo.svg" alt="logo" />
        </Link>

        <nav className="nav header__nav">
          <NavLink to="/" className={getNavClass}>
            home
          </NavLink>

          <NavLink to="/phones" className={getNavClass}>
            phones
          </NavLink>

          <NavLink to="/tablets" className={getNavClass}>
            tablets
          </NavLink>

          <NavLink to="/accessories" className={getNavClass}>
            accessories
          </NavLink>
        </nav>
      </div>

      <div className="header__wrapper">
        {location.pathname === '/phones' && (
          <Search
            searchDirectory="phones"
            value={phoneSearchValue}
            changeValue={({ target }) => setPhoneSearchValue(target.value)}
          />
        )}

        {location.pathname === '/tablets' && (
          <Search
            searchDirectory="tablets"
            value={tabletSearchValue}
            changeValue={({ target }) => setTabletSearchValue(target.value)}
          />
        )}

        <NavLink
          to="/favorites"
          className={getIconClass}
        >
          <img
            className="icon__img"
            src="img/icons/heart.svg"
            alt="Icon Like"
          />
        </NavLink>

        <NavLink
          to="/cart"
          className={getIconClass}
        >
          <img
            className="icon__img"
            src="img/icons/cart.svg"
            alt="Icon Card"
          />
        </NavLink>
      </div>
    </header>
  );
};
