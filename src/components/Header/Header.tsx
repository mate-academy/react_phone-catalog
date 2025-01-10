import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import React from 'react';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__navbar--link', {
    'is-active': isActive,
  });

export const Header: React.FC = () => {
  return (
    <div className="header">
      <Link to="/" className="header__logo">
        <img src="/img/Logo.png" alt="Logo" />
      </Link>
      <div className="header__navbar">
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
        <NavLink to="/phones" className={getLinkClass}>
          Phones
        </NavLink>
        <NavLink to="/tablets" className={getLinkClass}>
          Tablets
        </NavLink>
        <NavLink to="/accessories" className={getLinkClass}>
          Accessories
        </NavLink>
      </div>
      <div className="header__user">
        <Link className="header__user--icon" to="/">
          <svg className="icon icon-user">
            <use href="/img/icons.svg#icon-favourites"></use>
          </svg>
        </Link>
        <Link className="header__user--icon" to="/">
          <svg className="icon icon-user">
            <use href="/img/icons.svg#icon-shopping-bag"></use>
          </svg>
        </Link>
      </div>
      <div className="header__menu">
        <Link className="header__menu--icon" to="/">
          <svg className="icon icon-menu">
            <use href="/img/icons.svg#icon-menu"></use>
          </svg>
        </Link>
      </div>
    </div>
  );
};
