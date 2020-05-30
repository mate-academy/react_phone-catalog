import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/phones" component={PhonesPage} />
        <Route exact path="/tablets" component={TabletsPage} />
        <Route exact path="/favorites" component={FavoritesPage} />
        <Route
          exact
          path="/:productType/:productId"
          component={ProductDetailsPage}
        />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
