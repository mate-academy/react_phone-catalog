import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__navbar--link', {
    'is-active': isActive,
  });

const getIconClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__user--icon', {
    'is-active-icon': isActive,
  });

export const Header: React.FC = () => {
  const favProductIds = useAppSelector(state => state.favorites.products);
  const cartProductIds = useAppSelector(state => state.cart.totalCount);

  return (
    <div className="header">
      <Link to="/" className="header__logo">
        <img src="img/Logo.png" alt="Logo" />
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
        <NavLink className={getIconClass} to="/favorites">
          <svg className="icon icon-user">
            <use href="img/icons.svg#icon-favourites"></use>
          </svg>
          {!!favProductIds.length && (
            <span className="header__user--icon icon-count">
              {favProductIds.length}
            </span>
          )}
        </NavLink>
        <NavLink className={getIconClass} to="/cart">
          <svg className="icon icon-user">
            <use href="img/icons.svg#icon-shopping-bag"></use>
          </svg>
          {!!cartProductIds && (
            <span className="header__user--icon icon-count">
              {cartProductIds}
            </span>
          )}
        </NavLink>
      </div>
      <div className="header__menu">
        <Link className="header__menu--icon" to="/menu">
          <svg className="icon icon-menu">
            <use href="img/icons.svg#icon-menu"></use>
          </svg>
        </Link>
      </div>
    </div>
  );
};
