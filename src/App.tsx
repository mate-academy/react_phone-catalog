import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import './App.scss';
import HomePage from './components/homePage/HomePage';

import Header from './components/Header/Header';

import Favorites from './components/Favorites/Favorites';
import Cart from './components/Cart/Cart';
import ProductsPage from './components/ProductsPage/ProductsPage';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          component={HomePage}
        />
        <Route
          path="/phone/:item?"
          exact
          component={ProductsPage}
        />
        <Route
          path="/tablet/:item?"
          exact
          component={ProductsPage}
        />
        <Route
          path="/accessories/:item?"
          exact
          component={ProductsPage}
        />
        <Route
          path="/favorites/:item?"
          exact
          component={Favorites}
        />
        <Route
          path="/cart"
          exact
          component={Cart}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
