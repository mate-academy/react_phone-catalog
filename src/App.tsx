import React, { FC, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { Nav } from './components/Nav/Nav';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

import './App.css';

import { PhoneCatalog } from './components/PhoneCatalog/PhoneCatalog';
import { Favourites } from './components/Favourites/Favourites';

const PhoneDetailsPageLazy = React.lazy(
  () => import('./components/PhoneDetailsPage/PhoneDetailsPage')
    .then(({ PhoneDetailsPage }) => ({ default: PhoneDetailsPage })),
);

const App: FC = () => (
  <div className="container">
    <Nav />
    <Switch>
      <Route
        path="/"
        render={() => <div>Home</div>}
        exact
      />
      <Route
        path="/phones"
        component={PhoneCatalog}
        exact
      />
      <Route
        path="/favourites"
        component={Favourites}
        exact
      />
      <Suspense fallback={(
        <Loader
          type="TailSpin"
          color="#000000"
          height={100}
          width={100}
        />
      )}
      >
        <Switch>
          <Route
            path="/phones/:phoneId"
            component={PhoneDetailsPageLazy}
            exact
          />
          <Route
            path="*"
            component={PageNotFound}
          />
        </Switch>
      </Suspense>
    </Switch>
  </div>
);

export default App;
