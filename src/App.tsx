import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';

import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/phones" exact component={PhonesPage} />
      <Route path="/tablets" component={TabletsPage} />
      <Route path="/accessories" component={AccessoriesPage} />

      <Route path="/favourites" component={FavouritesPage} />
      <Route path="/cart" component={CartPage} />
    </Switch>
  </div>
);

export default App;
