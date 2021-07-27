import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { AccessoriesPage } from './pages/AccessoriesPage';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div id="top">
      <Header />
        <Route
          exact
          path="/"
        >
          <HomePage />
        </Route>
        <Route
          exact
          path="/phones"
        >
          <PhonesPage />
        </Route>
        <Route
          exact
          path="/tablets"
        >
          <TabletsPage />
        </Route>
        <Route
          exact
          path="/accessories"
        >
          <AccessoriesPage />
        </Route>
        <Route
          exact
          path="/cart"
        >
          <Cart />
        </Route>
        <Route
          exact
          path="/favorites"
        >
          <Favorites />
        </Route>
        <Route
          exact
          path="/phones/:phoneId"
        >
          <ProductDetailsPage id={(((
              useRouteMatch('/phones/:phoneId') || {}).params || {}) as {phoneId: string}
            ).phoneId}
          />
        </Route>
        <Route
          exact
          path="/tablets/:tabletId"
        >
          <ProductDetailsPage id={(((
              useRouteMatch("/tablets/:tabletId") || {}).params || {}) as {tabletId: string}
            ).tabletId}
          />
        </Route>
      <Footer/>
    </div>
  )
};

export default App;
