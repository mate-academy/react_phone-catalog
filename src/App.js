import React from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom';

import PhonesPage from './PhonesPage';
import NotFoundPage from './NotFoundPage';

const HomePage = () => (
  <div className="home_page">
    Hello
  </div>
);

const App = () => (
  <div className="App">
    <h1>Phone catalog</h1>
    <nav>
      <NavLink
        to="/"
        exact
        className="tabs__home tabs__position"
        activeClassName="phoneClassActive"
      >
          Home
      </NavLink>
      <NavLink
        to="/phones"
        className="tabs__home"
        activeClassName="phoneClassActive"
      >
          tabsPage
      </NavLink>
    </nav>
    <Route path="/" exact component={HomePage} />
    <Route path="/phones" component={PhonesPage} />
    <Route path="/*" component={NotFoundPage} />

  </div>
);

export default App;
