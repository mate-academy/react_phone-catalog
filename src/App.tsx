import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ErrorPage } from './pages/ErrorPage';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={['/', '/home']} component={HomePage} />
        <Route exact path={['/phones', '/tablets']} component={ProductsPage} />
        <Route exact path="/favorites" component={FavoritesPage} />
        <Route
          exact
          path="/:productType/:productId"
          component={ProductDetailsPage}
        />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
