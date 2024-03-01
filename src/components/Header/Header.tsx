import React from 'react';
import { NavLink, Link, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import cn from 'classnames';

import './Header.scss';
import { Search } from '../Search/Search';
import { usePhones } from '../../hooks/usePhones';
import { getSearchWith } from '../../utils/getSearchWith';
import { Params } from '../../types/Params';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const phoneSearchValue = searchParams.get('phoneSearchValue') || '';
  const tabletSearchValue = searchParams.get('tabletSearchValue') || '';

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handlePhoneSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { target } = event;

    setSearchWith({ phoneSearchValue: target.value || null });
  };

  const handleTabletSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { target } = event;

    setSearchWith({ tabletSearchValue: target.value || null });
  };

  const {
    favoritesIds,
    cartProducts,
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
            changeValue={handlePhoneSearchChange}
          />
        )}

        {location.pathname === '/tablets' && (
          <Search
            searchDirectory="tablets"
            value={tabletSearchValue}
            changeValue={handleTabletSearchChange}
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

          {!!favoritesIds.length && (
            <div className="icon__count">
              {favoritesIds.length}
            </div>
          )}
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

          {!!cartProducts.length && (
            <div className="icon__count">
              {cartProducts.length}
            </div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
