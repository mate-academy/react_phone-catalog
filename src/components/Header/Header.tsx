import React from 'react';
import Navigation from '../Navigation/Navigation';
import Favorites from '../Favorites/Favorites';
import Cart from '../Cart/Cart';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header__nav">
        <Navigation />
      </div>
      <div className="header__icons">
        <Favorites />
        <Cart />
      </div>
    </div>
  );
};

export default Header;
