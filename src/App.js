import React, { useState } from 'react';
import './App.css';
import { Switch, Route, NavLink } from 'react-router-dom';

import HomePage from './components/HomePage';
import PhonesPage from './components/PhonesPage';
import BasketItems from './components/BasketItems';
import NoMatch from './components/NoMatch';

const App = () => {
  const [basketPhones, chandgeBasketItems] = useState([]);

  return (
    <div className="App">
      <h1>Phone catalog</h1>

      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            exact
            className="navigation__link"
          >
            Home
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            to="/phones"
            className="navigation__link"
          >
            Phones
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            to="/basket"
            className="navigation__link"
          >
            Basket:
            <span>{basketPhones.length}</span>
          </NavLink>
        </li>
      </ul>

      <Switch>
        <Route path="/" exact component={HomePage} />

        <Route
          path="/phones/:phoneId?"
          component={({ match }) => (
            <PhonesPage
              match={match}
              chandgeBasketItems={chandgeBasketItems}
              basketPhones={basketPhones}
            />
          )}
        />

        <Route
          path="/basket"
          component={() => (
            <BasketItems
              basketPhones={basketPhones}
              chandgeBasketItems={chandgeBasketItems}
            />
          )}
        />

        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default App;
