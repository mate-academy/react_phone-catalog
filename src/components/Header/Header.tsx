import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import cn from 'classnames';

import './Header.scss';
import { Search } from '../Search/Search';

const getClass = ({ isActive }: { isActive: boolean }) => (cn('nav__link', {
  'nav__link--active': isActive,
}));

export const Header: React.FC = () => {
  const [tabletSearchValue, setTabletSearchValue] = useState('');
  const [phoneSearchValue, setPhoneSearchValue] = useState('');

  const location = useLocation();

  return (
    <header className="header">
      <div className="header__nav-wrapper">
        <Link to="/" className="header__logo logo">
          <img src="./_new/img/logo.svg" alt="logo" />
        </Link>

        <nav className="nav header__nav">
          <NavLink to="/" className={getClass}>
            home
          </NavLink>

          <NavLink to="/phones" className={getClass}>
            phones
          </NavLink>

          <NavLink to="/tablets" className={getClass}>
            tablets
          </NavLink>

          <NavLink to="/accessories" className={getClass}>
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

        <Link to="/favorites" className="header__icon icon icon--like">
          <img src="./_new/img/icons/heart.svg" alt="Icon Like" />
        </Link>

        <Link to="/card" className="header__icon icon icon--card">
          <img src="./_new/img/icons/cart.svg" alt="Icon Card" />
        </Link>
      </div>
    </header>
  );
};
