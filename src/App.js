import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage'
import PhoneCatalog from './components/PhoneCatalog'
import Contacts from './components/Contacts'

const App = () => (
  <div className="App">
    <nav>
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            exact
          >
            <div className="logo-size">
              <div className="logo"></div>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
          >
            <div className="cart">
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-list-link"
            activeClassName="active-nav_link"
            to="/phones"
          >
            Phone Catalog
          </NavLink>
        </li>
        <li>
        <NavLink
          className="nav-list-link"
          activeClassName="active-nav_link"
          to="/contacts"
        >
          Contacts
        </NavLink>
        </li>
      </ul>
    </nav>

    <Route
      exact
      path="/"
      render={() => (
        <HomePage />
      )}
    />
    <Route
      exact
      path={`/phones/:id?`}
      render={({ match }) => (
        <PhoneCatalog
        id={match.params.id}
        />
      )}
    />
    <Route
      path="/contacts"
      render={() => (
        <Contacts />
      )}
    />
  </div>
)

export default App;
