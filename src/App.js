import React from 'react';
import './App.css';
import {
  HashRouter,
  Route,
  NavLink,
  Link,
  Switch,
} from 'react-router-dom';

import logo from './img/logo.png';
import HomePage from './components/HomePage';
import PhonesPage from './components/PhonesPage';
import NotFoundPage from './components/NotFoundPage';
import PhoneDetailsPage from './components/PhoneDetailsPage';

class App extends React.Component {
  state = {}

  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="header">

            <div className="header__logo">
              <Link to="/">
                <img src={logo} alt="Phone Catalog" />
              </Link>
            </div>

            <nav role="navigation">
              <ul className="main-menu">

                <li>
                  <NavLink
                    className="navlink"
                    to="/"
                    exact
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="navlink"
                    to="/phones/"
                  >
                    Phones
                  </NavLink>
                </li>

              </ul>
            </nav>
          </header>

          <Switch>

            <Route
              path="/"
              exact
              component={HomePage}
            />

            <Route
              path="/phones/"
              exact
              component={PhonesPage}
            />

            <Route
              path="/phones/:phoneId"
              exact
              component={PhoneDetailsPage}
            />

            <Route
              path="*"
              exact
              component={NotFoundPage}
            />

          </Switch>

        </div>

      </HashRouter>
    );
  }
}

export default App;
