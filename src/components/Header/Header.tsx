import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.scss';
import Search from '../Search/Search';
import CartLink from '../CartLink/CartLink';
import FavoriteLink from '../FavoriteLink/FavoriteLink';

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
        <FavoriteLink />
        <CartLink />
      </div>
    </div>
  );
};

export default Header;
