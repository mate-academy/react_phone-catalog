import React from 'react';
import './Header.scss';
import { Menu } from '../Menu';
import { Logo } from '../Logo';
import { Favourites } from '../Favourites';
import { ShoppingBag } from '../ShoppingBag';

export const Header = () => {
  return (
    <header className="header">
      <div className="header_container">
        <nav className="header__nav">
          <Logo />
          <Menu />
        </nav>
        <div className="header__shopping">
          <Favourites />
          <ShoppingBag />
        </div>
      </div>
    </header>
  );
};
