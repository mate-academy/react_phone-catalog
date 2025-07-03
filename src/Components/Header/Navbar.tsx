import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './Navbar.scss';
import { CartIcon } from '../../Pages/Cart/CartIcon';
import { FavouritesIcon } from '../../Pages/Favourites/FavouritesIcon';
import { useState, useEffect } from 'react';
import { BurgerMenu } from './BurgerMenu';

import React from 'react';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set('query', searchQuery);
    }

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [searchQuery, navigate, location.pathname]);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;
      document.body.classList.toggle('no-scroll', newState);
      return newState;
    });
  };

  const searchRoutes = ['/phones', '/tablets', '/accessories'];

  const shouldShowSearch = searchRoutes.includes(location.pathname);

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container navbar-container">
          {isMobileMenuOpen && <BurgerMenu onClose={toggleMenu} />}

          <NavLink
            to="/"
            className="logo"
          >
            <img
              src="./img/Logo.png"
              alt="Logo"
            />
          </NavLink>
          <button
            className="burger-menu-toggle"
            onClick={toggleMenu}
          >
            ☰
          </button>

          <div className="navbar-left">
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

          {shouldShowSearch && (
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
          )}

          <div className="navbar-right">
            <FavouritesIcon />
            <CartIcon />
          </div>
        </div>
      </nav>
    </div>
  );
};
