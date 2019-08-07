import React from 'react';
import './styles/App.css';

import { Route, NavLink, Switch } from 'react-router-dom';
import Home from './Home';
import NotFoundPage from './NotFoundPage';
import PhonesPage from './PhonesPage';
import Basket from './Basket';

const App = () => (
  <div className="App">
    <header className="App-header">
      <nav>
        <ul className="App__nav">
          <li className="App__nav-link">
            <NavLink
              className="nav-link"
              to="/"
              activeClassName="nav-link__active"
              exact
            >
              Home
            </NavLink>
          </li>
          <li className="App__nav-link">
            <NavLink
              className="nav-link"
              to="/phone-catalog"
              activeClassName="nav-link__active"
            >
              Phone Catalog
            </NavLink>
          </li>
        </ul>
      </nav>

      <Basket />
    </header>

    <main className="App-container">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/phone-catalog/:id?"
          render={({ match }) => (
            <PhonesPage
              match={match}
            />
          )}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  </div>
);

export default App;
