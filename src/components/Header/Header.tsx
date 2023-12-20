/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import './Header.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import logoImg from '../../images/LOGO.svg';
import favoriteIcon from '../../images/Favorite_icon.svg';
import basketIcon from '../../images/Basket_icon.svg';
import { SearchField } from '../SearchField/SearchField';

const getLinkClass = (
  { isActive }: { isActive: boolean },
) => classNames('navbar__list-item', {
  'is-active': isActive,
});

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const searchShow = pathname === '/phone';

  return (
    <header className="header">
      <div className="navigation">

        <div className="navigation__left">
          <Link to="/" className="navigation__logo">
            <img src={logoImg} className="navigation__logo-image" alt="logo_image" />
          </Link>

          <nav className="navbar">
            <ul className="navbar__list">
              <NavLink to="/" className={getLinkClass}>home</NavLink>
              <NavLink to="phone" className={getLinkClass}>phones</NavLink>
              <NavLink to="tablet" className={getLinkClass}>tablets</NavLink>
              <NavLink to="accessory" className={getLinkClass}>accessories</NavLink>
            </ul>
          </nav>
        </div>

        <div className="navigation__right">
          {searchShow && <SearchField />}

          <Link to="/" className="navigation__icon">
            <img src={favoriteIcon} alt="icon_favorite" className="navigation__icon-favorite" />
          </Link>

          <Link to="/" className="navigation__icon">
            <img src={basketIcon} alt="icon-basket" className="navigation__icon-basket" />
          </Link>
        </div>

      </div>
    </header>
  );
};
