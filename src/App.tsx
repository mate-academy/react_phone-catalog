import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

import './App.css';

import { PhoneCatalog } from './components/PhoneCatalog/PhoneCatalog';
// import PhoneDetailsPage from './PhoneDetailsPage';

const App: FC = () => (
  <>
    <Nav />
    <Switch>
      <Route
        path="/"
        exact
      />
      <Route
        path="/phones"
        component={PhoneCatalog}
        exact
      />
      <Route
        path="*"
        component={PageNotFound}
      />
    </Switch>
    {/* <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <section>
            <h2>Filter</h2>

            <label>
              <div>Search:</div>
              <input />
            </label>

            <label>
              <div>Sort by:</div>
              <select>
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
            </label>
          </section>

          <section>
            <h2>Shopping Cart</h2>
            <ul>
              <li>Phone 1</li>
              <li>Phone 2</li>
              <li>Phone 3</li>
            </ul>
          </section>
        </div>

        <div className="col-md-10">
          <PhoneDetailsPage />
          <PhoneCatalog />
        </div>
      </div>
    </div> */}
  </>
);

export default App;
