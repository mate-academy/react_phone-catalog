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
import ProductsPage from './components/ProductsPages/ProductsPage';
import Footer from './components/Footer/Footer';
import PhonePage from './components/ProductsPages/PhonePage/PhonePage';
import Tablets from './components/ProductsPages/Tablets/Tablets';
import Rights from './components/Rights/Rights';
import Contacts from './components/Contacts/Contacts';

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
          component={PhonePage}
        />
        <Route
          path="/tablet/:item?"
          exact
          component={Tablets}
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
        <Route
          path="/rights"
          exact
          component={Rights}
        />
        <Route
          path="/contacts"
          exact
          component={Contacts}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
