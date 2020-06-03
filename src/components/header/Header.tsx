import React from 'react';
import {NavLink} from 'react-router-dom';
import Navigation from './navigation/Navigation';
import Favourites from './favourites/Favourites';
import Cart from './cart/Cart';


import './Header.scss';

const Header = () => {
  return (
    <div className="Header">
    <ul>
      <li>
      <NavLink to="/"
              exact
              className="Logo"
              activeClassName="Logo--active"
            >LOGO</NavLink>
      </li>
    </ul>
      < Navigation />
      < Favourites />
      < Cart />

    </div>

  )

}
export default Header;
