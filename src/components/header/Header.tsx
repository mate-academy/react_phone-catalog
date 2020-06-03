import React from 'react';

import Navigation from './navigation/Navigation';
import Favourites from './favourites/Favourites';
import Cart from './cart/Cart';


import './Header.scss';

const Header = () => {
  return (
    <div className="Header">



      < Navigation />
      < Favourites />
      < Cart />

    </div>

  )

}
export default Header;
