import React from 'react';
import './Navbar.scss';
import { NavList } from './NavList/NavList';
import { Favorite } from './Favorite/Favorite';
import { Cart } from './Cart/Cart';

export const Navbar = () => {
  return (
    <nav className="header-navbar">
      <NavList />
      <div className="header-right">
        <Favorite />
        <Cart />
      </div>
    </nav>
  );
};
