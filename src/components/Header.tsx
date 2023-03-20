import React from 'react';
import { HeaderLink } from './HeaderLink';
import { Logo } from './Logo';
import { FavouritesLink } from './FavouritesLink';
import { CartLink } from './CartLink';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-block">
        <Logo className="header__logo" />
        <nav className="header-nav">
          <HeaderLink
            to="/"
            text="home"
            className="header-nav__link"
          />
          <HeaderLink to="/Phones" text="phones" className="header-nav__link" />
          <HeaderLink
            to="/Tabletes"
            text="tabletes"
            className="header-nav__link"
          />
          <HeaderLink
            to="/Accessories"
            text="accessories"
            className="header-nav__link"
          />
        </nav>
      </div>
      <div className="header-block">
        <FavouritesLink />
        <CartLink />
      </div>
    </header>
  );
};
