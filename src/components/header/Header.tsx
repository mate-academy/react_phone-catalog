import React from 'react';
import Navigation from './navigation/Navigation';
import Favourites from './favourites/Favourites';
import Cart from './cart/Cart';

import './Header.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './navigation/home/Home';
import Phones from './navigation/phones/Phones';
import Tablets from './navigation/tablets/Tablets';
import Accessories from './navigation/accessories/Accessories';

import './Header.scss';

const Header = () => {
  return (
    <>
      <div className="Header">
        < Navigation />
        <div className="Header__actions">
          < Favourites />
          < Cart />
        </div>
      </div>

      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/phones" exact component={Phones} />
        <Route path="/tablets" component={Tablets} />
        <Route path="/accessories" component={Accessories} />
        <Route component={() => <h1>NOT FOUND</h1>} />
        <Redirect from="/home" to="/" />
      </Switch>
    </>
  )

}
export default Header;
