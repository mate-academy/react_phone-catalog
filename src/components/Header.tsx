import React from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderLink } from './HeaderLink';
import { Logo } from './Logo';
import { FavouritesLink } from './FavouritesLink';
import { CartLink } from './CartLink';
import { SearchBar } from './SearchBar';
import { QuerryCategories } from '../types/QuerryCategories';

export const Header: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1).split('/');

  const category = pathname[0];

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
        {Object.values(QuerryCategories).some(item => item === category) && (
          <SearchBar category={category} />
        )}
        <FavouritesLink />
        <CartLink />
      </div>
    </header>
  );
};
