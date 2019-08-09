import React from 'react';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom';

import PhonesPage from './PhonesPage';
import NotFoundPage from './NotFoundPage';

const HomePage = () => (
  <div className="home_page">
    Hello
  </div>
);

const App = () => (
  <div className="App">
    <nav className="nav__main_container">
      <NavLink
        to="/"
        exact
        className="page__home phone__position"
        activeClassName="phoneClassActive"
      >
          Home
      </NavLink>
      <NavLink
        to="/phones"
        className="Phones__page"
        activeClassName="phoneClassActive"
      >
        PhonesPage
      </NavLink>
    </nav>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/phones" component={PhonesPage} />
      <Route path="*" exact component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
