import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import PhonesPage from './components/phonesPage/PhonesPage';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import PhoneDetailsPage from './components/phoneDetailsPage/PhoneDetailsPage';
import Basket from './components/basket/Basket';
import './App.css';

const App = () => (
  <>
    <header className="header">
      <nav className="header__nav">
        <ul className="header__nav--list">
          <li>
            <NavLink
              to="/"
              exact
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/phones">
              Phones
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header__basket">
        <NavLink to="/basket">
          <img src="./img/ico/cart-icon.png" alt="" />
        </NavLink>
      </div>
    </header>

    <div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/phones/:phoneId" component={PhoneDetailsPage} />
        <Route path="/phones" component={PhonesPage} />
        <Route path="/basket" component={Basket} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </>
);

export default App;
