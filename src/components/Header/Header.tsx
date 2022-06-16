import React from 'react';
import {
  NavLink,
  Link,
  Routes,
  Route,
} from 'react-router-dom';
import { Nav } from './Nav';
import { Search } from '../Search/Search';

import {
  ReactComponent as FavouritesIcon,
} from '../../assets/icons/favourites-icon.svg';
import { ReactComponent as CartIcon } from '../../assets/icons/cart-icon.svg';
import { ReactComponent as Logo } from '../../assets/icons/Logo.svg';

import './header.scss';

export const Header: React.FC = () => {
  const favouritesCount = () => {
    const count: string | null = localStorage.getItem('favourite');
    const countParsed = count ? JSON.parse(count) : [];

    if (countParsed.length > 0) {
      return (
        <span className="header__favouritesCount">
          {countParsed.length}
        </span>
      );
    }

    return '';
  };

  const cartCount = () => {
    const count: string | null = localStorage.getItem('cart');
    const countParsed = count ? JSON.parse(count) : [];

    if (countParsed.length > 0) {
      return (
        <span className="header__cartCount">
          {countParsed.length}
        </span>
      );
    }

    return '';
  };

  return (
    <div className="header">
      <Link to="/" className="header__logo">
        <Logo />
      </Link>
      <Nav />

      <Routes>
        <Route
          path="/favourites"
          element={<Search placeholder="Search in favourites..." />}
        />
        <Route
          path="/phones"
          element={<Search placeholder="Search in phones..." />}
        />
        <Route
          path="/tablets"
          element={<Search placeholder="Search in tablets..." />}
        />
        <Route
          path="/accessories"
          element={<Search placeholder="Search in accessories..." />}
        />
      </Routes>

      <NavLink
        to="/favourites"
        className={({ isActive }) => (isActive
          ? 'header__favourites active-link'
          : 'header__favourites'
        )}
      >
        <FavouritesIcon />
        {favouritesCount()}
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive
          ? 'header__cart active-link'
          : 'header__cart'
        )}
      >
        <CartIcon />
        {cartCount()}
      </NavLink>
    </div>
  );
};
