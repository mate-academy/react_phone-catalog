import React from 'react';
import { useLocation } from 'react-router-dom';
import { Nav } from '../Nav/Nav';
import { NavCart } from '../NavCart/NavCart';
import { NavFavourite } from '../NavFavourite/NavFavorite';
import { Search } from '../Search/Search';
import { HEADER_NAVIGATION } from '../../../../helpers/variables';
import './Header.scss';

const HEADER_SEARCH_PATHNAME = ['/phones', '/tablets', '/accessories', '/favorites'];

export const Header = () => {
  const { pathname } = useLocation();
  const includeSearch: boolean = HEADER_SEARCH_PATHNAME.includes(pathname);

  return (
    <div className="Header">
      <div className="Header-NavAndLogo">
        <img
          src="/img/icons/logo.svg"
          alt="header-logo"
          className="Header-Logo"
        />
        <Nav navLinks={HEADER_NAVIGATION} navType="header" />
      </div>
      <div className="Header-Actions">
        {includeSearch && (
          <Search />
        )}
        <NavFavourite />
        <NavCart />
      </div>
    </div>
  );
};
