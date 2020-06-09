import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ErrorPage } from './pages/ErrorPage';
import { CartPage } from './pages/CartPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { loadProducts } from './redux';
import { Checkout } from './components/Cart/Checkout';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <main className="main">
        <Switch>
          <Route exact path={['/', '/home']} component={HomePage} />
          <Route exact path={['/phones', '/tablets']} component={ProductsPage} />
          <Route exact path="/accessories" component={AccessoriesPage} />
          <Route exact path="/favorites" component={FavoritesPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/checkout" component={Checkout} />
          <Route
            exact
            path="/:productType/:productId"
            component={ProductDetailsPage}
          />
          <Route component={ErrorPage} />
        </Switch>
      </main>
      <Footer />
    </>
  );
};

export default App;
