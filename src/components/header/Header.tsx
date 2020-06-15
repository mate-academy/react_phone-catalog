import React from 'react';

import Navigation from './navigation/Navigation';
import Favorites from '../favorites/Favorites';
import Cart from '../cart/Cart';


import './Header.scss';

const Header = () => {
  return (
    <>
      <div className="Header">
        <Navigation />
        <div className="Header__actions">
          <Favorites />
          <Cart />
        </div>
      </div>
    </>
  );
};

export default Header;
