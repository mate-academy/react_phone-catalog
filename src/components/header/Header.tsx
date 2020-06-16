import React from 'react';

import Navigation from './navigation/Navigation';
import FavoritesLink from '../favorites/Favorites';
import CartLink from '../cart/Cart';

import './Header.scss';

const Header = () => {
  return (
    <>
      <div className="Header">
        <Navigation />
        <div className="Header__actions">
          <FavoritesLink />
          <CartLink />
        </div>
      </div>
    </>
  );
};

export default Header;
