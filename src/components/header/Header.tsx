import React from 'react';
import './Header.scss';
import { Route } from 'react-router-dom';
import Logo from './Logo/Logo';
import Nav from './Nav';
import Favorite from './Favorite/Favorite';
import Cart from './Cart/Cart';
import SearchInput from './SearchInput';

const Header = () => {
  return (
    <header id="header" className="header">
      <div className="header__nav menu">
        <div className="header__nav-logo">
          <Logo />
        </div>
        <Nav />
      </div>
      <div className="header__nav action">
        <Route path="/phones" exact>
          <SearchInput section="phones" />
        </Route>
        <Route path="/tablets" exact>
          <SearchInput section="tablets" />
        </Route>
        <Route path="/accessories" exact>
          <SearchInput section="accessories" />
        </Route>
        <Favorite />
        <Cart />
      </div>
    </header>
  );
};

export default Header;
