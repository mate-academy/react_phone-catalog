import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App1.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';
import { NotFound404Page } from './components/NotFound404Page';

const App: FC = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/phones" exact>
        <PhonesPage />
      </Route>
      <Route path="/notfound404" exact>
        <NotFound404Page />
      </Route>
      <Redirect path="*" to="/notfound404" />
    </Switch>
  </Router>
);

export default App;
