import React from 'react';

import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import PhonesPage from './components/PhonesPage/PhonesPage';
import TabletsPage from './components/TabletsPage/TabletsPage';
import AccessoriesPage from './components/AccessoriesPage/AccessoriesPage';
import errorPage from './components/errorPage/errorPage';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" exact component={HomePage} />
      <Route path="/phones" exact component={PhonesPage} />
      <Route path="/tablets" component={TabletsPage} />
      <Route path="/accessories" component={AccessoriesPage} />
      <Route path="/" component={errorPage} />
    </Switch>
    <Footer />
  </div>
);

export default App;
