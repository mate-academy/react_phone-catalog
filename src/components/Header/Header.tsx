import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import React from 'react';
import { getIconClass, getLinkClass } from '../../utils/heplerFunctions';
import { useAppSelector } from '../../app/hooks';

export const Header: React.FC = () => {
  const favProductIds = useAppSelector(state => state.favorites.products);
  const cartProductIds = useAppSelector(state => state.cart.products);
  const totalCount = cartProductIds.reduce(
    (count, product) => count + product.count,
    0,
  );

  return (
    <div className="header">
      <Link to="/" className="header__logo">
        <img src="img/Logo.svg" alt="Logo" className="header__logo--pict" />
      </Link>
      <nav className="header__navbar">
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
      </nav>
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
          {!!totalCount && (
            <span className="header__user--icon icon-count">{totalCount}</span>
          )}
        </NavLink>
      </div>
      <div className="header__menu">
        <Link to={'/menu'} className="header__menu--icon">
          <svg className="icon icon-menu">
            <use href="img/icons.svg#icon-menu"></use>
          </svg>
        </Link>
      </div>
    </div>
  );
};
