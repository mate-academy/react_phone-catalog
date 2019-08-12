import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import PhoneCatalog from './components/PhoneCatalog/PhoneCatalog';
import PageNotFound from './components/pageNotFound/PageNotFound';
import './App.css';

class App extends React.Component {
  state = {
    phones: [],
  };

  render() {
    const { phones } = this.state;

    return (
      <div>
        <Router>
          <div>
            <nav>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <NavLink exact className="nav-link" to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/catalog">
                    PhoneCatalog
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/cart">
                    Cart
                  </NavLink>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route exact path="/" render={() => (<h2>Home</h2>)} />
              <Route
                path="/catalog"
                render={() => <PhoneCatalog phones={phones} />}
              />
              <Route path="/cart" render={() => (<h2>cart is empty</h2>)} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
