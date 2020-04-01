import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import './styles/main.scss';
import { HomePage } from './components/HomePage';
import { PhoneDetailsPage } from './components/PhoneDetailsPage';
import { PhonesPage } from './components/PhonesPage';
import { NotFound } from './components/NotFound';
import { Footer } from './components/Footer';
import { Basket } from './components/Basket';
import { Favorites } from './components/Favorites';

const App: FC = () => (
  <div>
    <div className="row">
      <div>
        <div className="container">
          <Nav />
          <Switch>
            <Route
              path="/"
              exact
              component={HomePage}
            />
            <Route
              path="/phones"
              exact
              component={PhonesPage}
            />
            <Route
              path="/cart"
              exact
              component={Basket}
            />
            <Route
              path="/favorites"
              exact
              component={Favorites}
            />
            <Route
              path="/phones/:phoneId"
              exact
              component={PhoneDetailsPage}
            />
            <Route
              path="*"
              exact
              component={NotFound}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  </div>
);

export default App;
