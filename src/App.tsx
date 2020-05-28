import React from 'react';
import { Switch, Route } from 'react-router-dom';


import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import './App.scss';


import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';

import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <div className="container">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/phones" exact component={PhonesPage} />
        <Route path="/tablets" component={TabletsPage} />
        <Route path="/accessories" component={AccessoriesPage} />

        <Route path="/favorites" component={FavoritesPage} />
        <Route path="/cart" component={CartPage} />
      </Switch>
    </div>
  </div>
);

export default App;
