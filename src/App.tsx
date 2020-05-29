import React from 'react';

import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';

const App = () => (
  <div className="App">
    <Header />
    <div className="main">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/phones">Phones</Route>
        <Route path="/tablets" />
        <Route path="/accessories" />
        <Redirect from="/home" to="/">Home</Redirect>
        <h1 className="container">Page not found</h1>
      </Switch>
    </div>
    <footer />
  </div>
);

export default App;
