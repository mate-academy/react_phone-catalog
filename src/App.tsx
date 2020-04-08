import React, { FC, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { Nav } from './components/Nav/Nav';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

import './App.css';

import { PhoneCatalog } from './components/PhoneCatalog/PhoneCatalog';

const PhoneDetailsPageLazy = React.lazy(
  () => import('./components/PhoneDetailsPage/PhoneDetailsPage')
    .then(({ PhoneDetailsPage }) => ({ default: PhoneDetailsPage })),
);

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
      <Suspense fallback={(
        <Loader
          type="TailSpin"
          color="#000000"
          height={100}
          width={100}
        />
      )}
      >
        <Route
          path="/phones/:phoneId"
          component={PhoneDetailsPageLazy}
          exact
        />
      </Suspense>
      <Route
        path="*"
        component={PageNotFound}
      />
    </Switch>
  </>
);

export default App;
