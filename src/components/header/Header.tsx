import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import Favourites from '../favourites/Favourites';
import Cart from '../cart/Cart';
import Phones from '../phones/Phones';
import Tablets from '../tablets/Tablets';
import Accessories from '../accessories/Accessories';
import Home from '../home/Home';

import './Header.scss';

const Header = () => {
  return (
    <>
      <div className="Header">
        <Navigation />
        <div className="Header__actions">
          <Favourites />
          <Cart />
        </div>
      </div>

      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/phones" exact component={Phones} />
        <Route path="/tablets" component={Tablets} />
        <Route path="/accessories" component={Accessories} />
        <Redirect from="/home" to="/" />
        <Route path="/" component={() => <h1>NOT FOUND</h1>} />
      </Switch>

    </>
  );
};

export default Header;
