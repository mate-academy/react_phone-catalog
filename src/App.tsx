import React, { FC, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import './App.css';

import { Nav } from './components/Nav/Nav';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PhoneCatalog } from './components/PhoneCatalog/PhoneCatalog';
import { Favourites } from './components/Favourites/Favourites';
import { Cart } from './components/Cart/Cart';

const PhoneDetailsPageLazy = React.lazy(
  () => import('./components/PhoneDetailsPage/PhoneDetailsPage')
    .then(({ PhoneDetailsPage }) => ({ default: PhoneDetailsPage })),
);

const App: FC = () => (
  <div id="top" className="container">
    <Nav />
    <main className="main">
      <Switch>
        <Route
          path="/"
          component={Home}
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
        <Route
          path="/cart"
          component={Cart}
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
    </main>
    <Footer />
  </div>
);

export default App;
