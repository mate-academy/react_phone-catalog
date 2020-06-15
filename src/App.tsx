import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/Header';

import Home from './components/home/Home';
import Phones from './components/phones/Phones';
import Tablets from './components/tablets/Tablets';
import Accessories from './components/accessories/Accessories';
import { Favorites } from './components/favorites/Favorites';
import { Cart } from './components/cart/Cart';

import Footer from './components/footer/Footer';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/phones" exact component={Phones} />
        <Route path="/tablets" component={Tablets} />
        <Route path="/accessories" component={Accessories} />

        <Route path="/Favorites" component={Favorites} />
        <Route path="/Cart" component={Cart} />

        <Redirect from="/home" to="/" />
        <Route path="/" component={() => <h1>NOT FOUND</h1>} />
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
