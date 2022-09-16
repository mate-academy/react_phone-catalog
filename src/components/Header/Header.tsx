import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './Header.scss';

import { Search } from '../Search/Search';
import { ProductsContext } from '../../helpers/ProductContext';

export const Header: React.FC = () => {
  const { cart, favorites } = useContext(ProductsContext);
  const location = useLocation();
  const selectedPage = location.pathname.slice(1);

  const showSearchComponent = selectedPage === 'phones'
    || selectedPage === 'tablets'
    || selectedPage === 'accessories'
    || selectedPage === 'favorites';

  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavLink
          to=""
          className="navbar-item logo"
        >
          Logo
        </NavLink>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <NavLink
            to=""
            className={navData => `navbar-item nav-title ${navData.isActive ? 'is-active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="phones"
            className={navData => `navbar-item nav-title ${navData.isActive ? 'is-active' : ''}`}
          >
            Phones
          </NavLink>
          <NavLink
            to="tablets"
            className={navData => `navbar-item nav-title ${navData.isActive ? 'is-active' : ''}`}
          >
            Tablets
          </NavLink>
          <NavLink
            to="accessories"
            className={navData => `navbar-item nav-title ${navData.isActive ? 'is-active' : ''}`}
          >
            Accessories
          </NavLink>
        </div>
        <div className="navbar-end">
          {showSearchComponent && <Search selectedPage={selectedPage} />}
          <NavLink
            to="favorites"
            className={navData => `navbar-item ${navData.isActive ? 'is-active' : ''}`}
          >
            <i className={classNames(
              { 'fa-regular fa-heart': favorites.length === 0 },
              { 'fa-solid fa-heart red-color': favorites.length > 0 },
            )}
            />
          </NavLink>
          <NavLink
            to="cart"
            className={navData => `navbar-item ${navData.isActive ? 'is-active' : ''}`}
          >
            <i className={classNames(
              'fa-solid',
              { 'fa-cart-shopping': cart.length === 0 },
              { 'fa-cart-arrow-down': cart.length > 0 },
            )}
            />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
