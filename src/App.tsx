import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './views/Home/HomePage';
import { NotFound } from './components/NotFound/NotFound';
import { PhonesPage } from './views/Phones/PhonesPage';
import { TabletsPage } from './views/Tablets/TabletsPage';
import { AccessoriesPage } from './views/Accessories/AccessoriesPage';

const App = () => (
  <div className="container-fluid">
    <div className="row">
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/phones" component={PhonesPage} />
        <Route path="/tablets" component={TabletsPage} />
        <Route path="/accessories" component={AccessoriesPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
);

export default App;
