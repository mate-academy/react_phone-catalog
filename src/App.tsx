import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { Header } from './components/Header';
import { PhonesPage } from './pages/PhonesPage';
import { HomePage } from './pages/HomePage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { Footer } from './components/Footer';
import './App.scss';

const App = () => (
  <>
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Redirect from="/home" to="/" />
      <Route path="/phones" component={PhonesPage} />
      <Route path="/tablets" component={TabletsPage} />
      <Route path="/accessories" component={AccessoriesPage} />
      <h1>Page not found</h1>
    </Switch>
    <Footer />
  </>
);

export default App;
