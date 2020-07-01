import React, { useEffect } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header } from './components/Header/Header';
import { PhonesPage } from './pages/PhonesPage';
import { HomePage } from './pages/HomePage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { Footer } from './components/Footer/Footer';
import { FavoritesPage } from './pages/FavouritesPage';
import { CardPage } from './pages/CartPage';
import './App.scss';
import './helpers/fonts/fonts.scss';
import { loadData } from './store/index';
import { ProductPage } from './pages/ProductPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="main">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/phones" exact component={PhonesPage} />
          <Route path="/tablets" exact component={TabletsPage} />
          <Route path="/accessories" component={AccessoriesPage} />
          <Route path="/favorites" exact component={FavoritesPage} />
          <Route path="/cart" exact component={CardPage} />
          <Route
            exact
            path="/:productType/:productId"
            component={ProductPage}
          />
          <Redirect from="/home" to="/" />
          <NotFoundPage />
        </Switch>
      </main>
      <Footer />
    </>
  );
};

export default App;
