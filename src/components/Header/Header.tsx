import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Favorites from '../Favorites/Favorites';
import Cart from '../Cart/Cart';
import './Header.scss';
import Search from '../Search/Search';


const Header = () => {
  return (
    <div className="header">
      <div className="header__nav">
        <Navigation />
      </div>

      <div className="header__icons">
        <Route exact path={['/phones', '/tablets', '/accessories']}>
          <Search />
        </Route>
        <Favorites />
        <Cart />
      </div>
    </div>
  );
};

export default Header;
