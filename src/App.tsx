import React from 'react';

import './App.scss';
import Header from './components/Header/Header';
import HomePage from './components/homePage/HomePage';
import {Route, Switch} from "react-router";
import ProductPage from "./components/homePage/ProductPage/ProductPage";

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />

      <Route
        path="/phones/:item?"
        exact
        render={({ match }) => (
          <ProductPage currentProduct={match.params.item} />
        )}
      />

      <Route
        path="/tablets/:item?"
        exact
        render={({ match }) => (
          <ProductPage currentProduct={match.params.item} />
        )}
      />

      <Route
        path="/accessorys/:item?"
        exact
        render={({ match }) => (
          <ProductPage currentProduct={match.params.item} />
        )}
      />

    </Switch>
  </div>
);

export default App;
