import React from 'react';
import './App.css';
import { Route, Switch, NavLink } from 'react-router-dom';
import PhonesPage from './PhonesPage';
import HomePage from './HomePage';
import Cart from './Cart';
import NotFoundPage from './NotFoundPage';

const App = () => (
  <div className="App">
    <div className="header">
      <nav className="nav-wrapper">
        <div className="container">
          <img src="img/brand-logo.png" alt="brand-logo" />
          <ul className="right hide-on-med-and-down">
            <li>
              <NavLink to="/" exact>Home</NavLink>
            </li>
            <li>
              <NavLink to="/phones-page">Phones</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/phones-page" component={PhonesPage} />
      <Route path="/cart" component={Cart} />
      <Route path="/" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
