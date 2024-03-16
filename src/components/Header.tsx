/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

type Props = {
  cartItems:CartItem[];
  favourites:Product[];
};

export const Header: React.FC<Props> = ({ cartItems, favourites }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__menu">
          <div className="header__logo logo">
            <NavLink to="/" className="logo-link">
              <img src="img/logo-2x.png" className="logo-img" alt="logo" />
            </NavLink>
          </div>

          <nav className="navbar header__navbar">
            <NavLink
              to="/"
              className={({ isActive }) => cn('navbar__link',
                { 'active-link': isActive })}
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) => cn('navbar__link',
                { 'active-link': isActive })}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) => cn('navbar__link',
                { 'active-link': isActive })}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) => cn('navbar__link',
                { 'active-link': isActive })}
            >
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className="header__right">
          {(location.pathname === '/phones' ||
            location.pathname === '/favourites' ||
            location.pathname === '/tablets' ||
            location.pathname === '/accessories') && (
            <SearchBar placeholder={location.pathname} />
          )}

          <div className="menu-burger header__burger-menu">
            <img
              src="icons/menu_icon.png"
              alt="Menu"
              className="burger-icon"
              onClick={toggleMenu}
            />
            {isOpen && (
              <div className="menu">
                <div
                  className="icon icon--close-menu menu__icon"
                  onClick={toggleMenu}
                />
                <nav className="navbar header__navbar header__navbar--mobile">
                  <NavLink
                    to="/"
                    className={({ isActive }) => cn('navbar__link menu__link', {
                      'active-link': isActive,
                    })}
                    onClick={toggleMenu}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/phones"
                    className={({ isActive }) => cn('navbar__link menu__link', {
                      'active-link': isActive,
                    })}
                    onClick={toggleMenu}
                  >
                    Phones
                  </NavLink>
                  <NavLink
                    to="/tablets"
                    className={({ isActive }) => cn('navbar__link menu__link', {
                      'active-link': isActive,
                    })}
                    onClick={toggleMenu}
                  >
                    Tablets
                  </NavLink>
                  <NavLink
                    to="/accessories"
                    className={({ isActive }) => cn('navbar__link menu__link', {
                      'active-link': isActive,
                    })}
                    onClick={toggleMenu}
                  >
                    Accessories
                  </NavLink>

                  <NavLink
                    to="/favourites"
                    className={({ isActive }) => cn('navbar__link menu__link', {
                      'active-link': isActive,
                    })}
                    onClick={toggleMenu}
                  >
                    Favourites
                  </NavLink>

                  <NavLink
                    to="/cart"
                    className={({ isActive }) => cn('navbar__link menu__link', {
                      'active-link': isActive,
                    })}
                    onClick={toggleMenu}
                  >
                    Cart
                  </NavLink>
                </nav>
              </div>
            )}
          </div>

          <div className="header__icons">
            <div className="header__icon-block">
              <NavLink
                to="/favourites"
                className={cn('icon icon--favorities', {
                  count: favourites.length > 0,
                })}
                data-count={favourites.length}
              />
            </div>
            <div className="header__icon-block">
              <NavLink
                to="/cart"
                className={cn('icon icon--cart', {
                  count: cartItems.length > 0,
                })}
                data-count={cartItems.length}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
