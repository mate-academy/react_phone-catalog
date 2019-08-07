import React from 'react';
import './App.css';
import {
  HashRouter,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

import HomePage from './components/HomePage';
import PhonesPage from './components/PhonesPage';
import NotFoundPage from './components/NotFoundPage';

class App extends React.Component {
  state = {

  }

  render() {
    return (
      <HashRouter>
        <div className="App">

          <nav>
            <ul className="nav">

              <li>
                <NavLink
                  className="navlink"
                  to="/"
                  exact
                >
                  HomePage
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="navlink"
                  to="/phones/"
                >
                  PhonesPage
                </NavLink>
              </li>

            </ul>
          </nav>
        </div>

        <Switch>

          <Route
            path="/"
            exact
            component={HomePage}
          />

          <Route
            path="/phones/:phoneId?"
            exact
            component={PhonesPage}
          />

          <Route
            path="*"
            exact
            component={NotFoundPage}
          />

        </Switch>

      </HashRouter>
    );
  }
}

export default App;
