import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';
import { NotFound404Page } from './components/NotFoundPage';

import './App.css';


const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/phones" exact>
        <PhonesPage />
      </Route>
      <Route path="/notfound" exact>
        <NotFound404Page />
      </Route>
      <Redirect path="/react_phone-catalog" to="/" />
      <Redirect path="*" to="/notfound" />
    </Switch>
  </Router>
);

export default App;
