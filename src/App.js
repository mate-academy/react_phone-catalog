import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import HomePage from './HomePage';
import PhonesPage from './PhonesPage';
import PhoneDetailsPage from './PhoneDetailsPage';
import NotFoundPage from './NotFoundPage';

const App = () => (
  <Router>
    <div className="App">
      <header>
        <NavLink to="/" exact activeClassName="active-link">
          Home
        </NavLink>
        <NavLink to="/phones" activeClassName="active-link">
          Phones
        </NavLink>

      </header>
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/phones" exact component={props => <PhonesPage {...props} /> } />
          <Route path="/phones/:idPhone" component={props => <PhoneDetailsPage {...props} /> } />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  </Router>
)

export default App;
