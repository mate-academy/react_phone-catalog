import React from 'react';
import { Logo } from './Logo';
import { Nav } from './Nav';
import { Favorites } from './Favorites';
import { Cart } from './Cart';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__flex-wrap">
        <div className="header__logo">
          <Logo />
        </div>
        <div className="header__nav">
          <Nav />
        </div>
      </div>
      <div className="header__flex-wrap">
        <Favorites />
        <Cart />
      </div>
    </header>
  );
};
