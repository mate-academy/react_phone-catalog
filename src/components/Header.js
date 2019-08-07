import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import Home from './Home';
import Phones from './Phones';
import NotFoundPage from './NotFoundPage';

class Header extends React.Component {

  render() {

    return (
      <>
        <nav>
          <ul className="navbar">
            <div className="navbar__main-points">

              <li><NavLink className="navlink" to="/" exact>
                <img class="logo-img" src="images/logo.png" alt="Logo" title="Logo" />
              </NavLink></li>

              <li>
                <NavLink className="navlink" to="/" activeClassName="active-navlink" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={this.fetchData}
                  className="navlink"
                  to="/phones/"
                  activeClassName="active-navlink"
                >
                  Phones
              </NavLink>
              </li>

            </div>

            <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary no-border" type="button">
                  <img class="search-img" src="images/search.svg" alt="search" title="search" />
                </button>
              </div>
              <input
                type="text"
                className="form-control border-bottom"
                placeholder="What are you looking for?"
                aria-label=""
                aria-describedby="basic-addon1"
              />
            </div>

            <div className="basket-content">

              <li><NavLink className="navlink dynamic_basket" to="/phones/">
                <img class="basket-img" src="images/basket.svg" alt="basket" title="basket" />
                My basket(0)
            </NavLink></li>

            </div>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/phones/" exact component={Phones} />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    )
  }
}

export default Header;
