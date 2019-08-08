/* eslint-disable */
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import './fonts.css';
import './App.css';
import Home from './components/Home';
import Catalog from './components/Catalog';
import NotFoundPage from './components/NotFoundPage';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <div className="main-link__container">
          <div className="logo">LOGO</div>
          <NavLink
            to="/"
            exact
            className="main-link"
            activeClassName="main-link__active"
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className="main-link"
            activeClassName="main-link__active"
          >
            Phone Catalog
          </NavLink>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/catalog/:phoneId?" component={Catalog} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
