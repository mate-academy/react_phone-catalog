import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import './styles/main.scss';
import { HomePage } from './components/HomePage';
import { PhoneDetailsPage } from './components/PhoneDetailsPage';
import { PhonesPage } from './components/PhonesPage';
import { NotFound } from './components/NotFound';

const App: FC = () => (
  <div className="container-fluid">
    <div className="row">
      <div>
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
    </div>
  </div>
);

export default App;
