import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header/Header';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { HomePage } from './components/HomePage/HomePage';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

const App = () => (
  <>
    <Header />

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/phones" component={PhonesPage} />
      <Route component={ErrorPage} />
    </Switch>
  </>
);

export default App;
