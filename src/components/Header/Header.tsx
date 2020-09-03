import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import '../../commonStyles/Link.scss';
import SearchInput from '../SearchInput/SearchInput';
import { cartItem, favoriteItems } from '../../store/fullStore/store';

type Location = {
  pathname: string;
};

const Header = () => {
  const location: Location = useLocation();
  const { pathname } = location;
  const pathnameLength = pathname.split('/').length;
  const cartItems = useSelector(cartItem);
  const favorites = useSelector(favoriteItems);

  console.log(pathname);

  return (
    <header className="header">
      <div className="header__routing-link">
        <div className="header__logo">
          <img
            src="./img/icons/header/LOGO.png"
            alt="logo"
          />
        </div>
        {pathname !== '/cart'
        && (
          <ul className="header__link-list link__list">
            <li className="link__item">
              <NavLink
                to="/"
                exact
                className="link__routing-link"
                activeClassName="link__disabled"
              >
                Home
              </NavLink>
            </li>
            <li className="link__item">
              <NavLink
                to="/phone"
                className="link__routing-link"
                activeClassName="link__disabled"
              >
                Phones
              </NavLink>
            </li>
            <li className="link__item">
              <NavLink
                to="/tablet"
                className="link__routing-link"
                activeClassName="link__disabled"
              >
                Tablets
              </NavLink>
            </li>
            <li className="link__item">
              <NavLink
                to="/accessories"
                className="link__routing-link"
                activeClassName="link__disabled"
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="header__link-wrapper">
        { (pathname !== '/'
          && pathname !== '/cart'
          && pathnameLength <= 2) && (
          <SearchInput />
        )}
        <ul className="header__link-list">
          {pathname !== '/cart'
          && (
            <li className="header__link-item">
              <NavLink
                to="/favorites"
                className="header__link"
              >
                <img
                  src="./img/icons/header/favorites.svg"
                  alt="favorites"
                />
                {favorites.length > 0 && (
                  <div className="header__storage-items-count">
                    {favorites.length}
                  </div>
                )}
              </NavLink>
            </li>
          )}
          <li className="header__link-item">
            <NavLink
              to="/cart"
              className="header__link"
            >
              <img
                src="./img/icons/header/cart.svg"
                alt="cart"
                className="link__content"
              />
              {cartItems.length > 0 && (
                <div className="header__storage-items-count">
                  {cartItems.length}
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
