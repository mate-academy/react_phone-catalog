import React from 'react';
import { Logo } from './Logo';
import { NavLinkHeader } from './NavLinkHeader';
import { FavouritesIcon } from '../assets/images/icons/FavouritesIcon';
import { CartIcon } from '../assets/images/icons/CartIcon';
import { NavBar } from './NavBar';

import '../styles/blocks/header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__navigation">
        <Logo />
        <NavBar />
      </div>

      <div className="header__top-actions">
        <NavLinkHeader type="icon" to="favourites">
          <FavouritesIcon />
          <span>1</span>
        </NavLinkHeader>

        <NavLinkHeader type="icon" to="cart">
          <CartIcon />
          <span>5</span>
        </NavLinkHeader>
      </div>
    </header>
  );
};
