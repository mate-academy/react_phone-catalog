import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CartContext } from '../CartProvider';
import { FavouriteContext } from '../FavouriteProvider';
import { Search } from '../Search';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { favourites } = useContext(FavouriteContext);
  const { cart, totalQuantity } = useContext(CartContext);

  return (
    <header className="header page__header">
      <div className="header__links">
        <NavLink to="/" className="logo" />
        {pathname !== '/cart' && (
          <nav className="nav">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive
                ? 'nav__link nav__link--active'
                : 'nav__link'
              )}
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) => (isActive
                ? 'nav__link nav__link--active'
                : 'nav__link'
              )}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) => (isActive
                ? 'nav__link nav__link--active'
                : 'nav__link'
              )}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) => (isActive
                ? 'nav__link nav__link--active'
                : 'nav__link'
              )}
            >
              Accessories
            </NavLink>
          </nav>
        )}
      </div>
      <div className="header__icons-link">
        { (pathname === '/phones'
          || pathname === '/tablets'
          || pathname === '/accessories'
          || pathname === '/favourites'
        ) && (
          <Search />
        )}
        {pathname !== '/cart' && (
          <NavLink
            to="/favourites"
            className={({ isActive }) => (isActive
              ? 'icon-link icon-link--favourites icon-link--active'
              : 'icon-link icon-link--favourites'
            )}
          >
            {favourites.length > 0 && (
              <div className="icon-link-count">{favourites.length}</div>
            )}
          </NavLink>
        )}
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive
            ? 'icon-link icon-link--cart icon-link--active'
            : 'icon-link icon-link--cart'
          )}
        >
          {cart.length > 0 && (
            <div className="icon-link-count">{totalQuantity}</div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
