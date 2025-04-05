import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './Navbar.scss';
import { CartIcon } from '../../Pages/Cart/CartIcon';
import { FavouritesIcon } from '../../Pages/FavouritesIcon';
import { useState, useEffect } from 'react';
import React from 'react';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Оновлюємо URL при зміні пошуку
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set('query', searchQuery);
    }

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [searchQuery, navigate, location.pathname]);

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container navbar-container">
          {/* Ліва сторона навбару */}
          <div className="navbar-left">
            <NavLink
              to="/"
              className="logo"
            >
              NICE👌
              <br />
              GADGETS
            </NavLink>

            <NavLink
              to="/"
              className={getLinkClass}
            >
              HOME
            </NavLink>

            <NavLink
              to="/phones"
              className={getLinkClass}
            >
              PHONES
            </NavLink>

            <NavLink
              to="/tablets"
              className={getLinkClass}
            >
              TABLETS
            </NavLink>

            <NavLink
              to="/accessories"
              className={getLinkClass}
            >
              ACCESSORIES
            </NavLink>
          </div>

          {/* Поле пошуку */}
          <div className="navbar-center">
            <input
              type="text"
              name="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Права сторона навбару */}
          <div className="navbar-right">
            <FavouritesIcon />

            <CartIcon />
          </div>
        </div>
      </nav>
    </div>
  );
};
