import React, { useEffect, useState } from 'react';
import { getProducts } from './helpers/api'
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PhonesPage from './pages/PhonesPage';
import TabletsPage from './pages/TabletsPage';
import AccessoriesPage from './pages/AccessoriesPage';
import FavoritesPage from './pages/FavoritesPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import './App.scss';

const App = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
      .then(people => {
        setProducts(people);
      });
  }, []);
  console.log(products);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" />
        <Route path="/" exact component={HomePage} />
        <Route path="/phones" component={PhonesPage} />
        <Route path="/tablets" component={TabletsPage} />
        <Route path="/accessories" component={AccessoriesPage} />
        <Route path="/product-details" component={ProductDetailsPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/favorites" component={FavoritesPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>

  )
};

export default App;
