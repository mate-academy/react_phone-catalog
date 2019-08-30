import React from 'react';
import './App.css';
import { Route, Switch, NavLink } from 'react-router-dom';
import PhonesPage from './PhonesPage';
import HomePage from './HomePage';
import Cart from './Cart';
import NotFoundPage from './NotFoundPage';
import Phone from './Phone';
import Footer from './Footer';

const App = () => (
  <div className="App">
    <header>
      <nav className="nav-wrapper">
        <div className="container">
          <a href="/">
            <img src="img/brand-logo.png" alt="brand-logo" />
          </a>
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
    </header>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/phones-page/:phoneId" component={Phone} />
      <Route path="/phones-page" exact component={PhonesPage} />
      <Route path="/cart" component={Cart} />
      <Route path="/" component={NotFoundPage} />
    </Switch>

    <Footer />
  </div>
);

export default App;
