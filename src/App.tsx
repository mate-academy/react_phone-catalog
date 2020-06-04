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
import { FavoritesPage } from './pages/FavoritesPage';
import { CardPage } from './pages/CardPage';
import './App.scss';
import './helpers/fonts/fonts.scss';
import { loadData } from './store/index';
import { ProductPage } from './pages/ProductPage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  return (
    <>

      <Header />

      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/phones" exact component={PhonesPage} />
          <Route path="/tablets" exact component={TabletsPage} />
          <Route path="/accessories" component={AccessoriesPage} />
          <Route path="/favorites" exact component={FavoritesPage} />
          <Route path="/card" exact component={CardPage} />
          <Route path="/phones/:productId" component={ProductPage} />
          <Route path="/tablets/:productId" component={ProductPage} />
          <Redirect from="/home" to="/" />
          <h1>Page not found</h1>
        </Switch>
      </main>

      <Footer />

    </>
  );
};

export default App;
