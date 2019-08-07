import React from 'react';
import './App.css';
import { Route, Switch, NavLink } from 'react-router-dom';

import PhonesPage from './components/PhonesPage';
import HomePage from './components/HomePage';
import PhoneDetailsPage from './components/PhoneDetailsPage';
import NotFoundPage from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <nav className="navigation">
      <ul>
        <li className="navigation__list-paragraph">
          <NavLink
            to="/"
            exact
            className="navigation__link"
            activeClassName="is-active"
          >
            Home
          </NavLink>
        </li>

        <li className="navigation__list-paragraph">
          <NavLink
            to="/phones"
            exact
            className="navigation__link"
            activeClassName="is-active"
          >
            Phones
          </NavLink>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route
        path="/"
        exact
        component={HomePage}
      />

      <Route
        path="/phones"
        exact
        component={PhonesPage}
      />

      <Route
        path="/phones/:phoneId"
        render={({ match }) => (
          <PhoneDetailsPage
            phoneId={match.params.phoneId}
          />
        )}
      />

      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
