import React, { FC, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { Nav } from './components/Nav';
import './styles/main.scss';

const HomePageAsync = lazy(() => import('./components/HomePage')
  .then(({ HomePage }) => ({ default: HomePage })));
const PhoneDetailsAsync = lazy(() => import('./components/PhoneDetailsPage')
  .then(({ PhoneDetailsPage }) => ({ default: PhoneDetailsPage })));

const PhonesPageAsync = lazy(() => import('./components/PhonesPage')
  .then(({ PhonesPage }) => ({ default: PhonesPage })));

const NotFoundAsync = lazy(() => import('./components/NotFound')
  .then(({ NotFound }) => ({ default: NotFound })));

const App: FC = () => (
  <div className="container-fluid">
    <div className="row">
      <div>
        <Nav />
        <Suspense
          fallback={(
            <div className="loader__wrapper">
              <Loader
                type="ThreeDots"
                color="#4dd599"
                height={100}
                width={100}
              />
            </div>
          )}
        >
          <Switch>
            <Route
              path="/"
              exact
              component={HomePageAsync}
            />
            <Route
              path="/phones"
              exact
              component={PhonesPageAsync}
            />
            <Route
              path="/phones/:phoneId"
              exact
              component={PhoneDetailsAsync}
            />
            <Route
              path="*"
              exact
              component={NotFoundAsync}
            />
          </Switch>
        </Suspense>
      </div>
    </div>
  </div>
);

export default App;
