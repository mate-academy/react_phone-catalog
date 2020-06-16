import React, { useEffect } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header/Header';
import { Home } from './components/Home/Home';
import { MobilePhonesPage } from './components/MobilePhonesPage/MobilePhonesPage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from './components/ProductDetailsPage/ProductDetailsPage';
import Footer from './components/Footer/Footer';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import CartPage from './components/CartPage/CartPage ';
import Checkout from './components/Checkout/Checkout';
import { getFavorites, getItems } from './store/index';

const App: React.FC = () => {
  const favoriteProducts = useSelector(getFavorites);
  const itemsCart = useSelector(getItems);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favoriteProducts]));
  }, [favoriteProducts]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([...itemsCart]));
  }, [itemsCart]);

  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" exact component={Home} />
          <Route path="/phones" exact component={MobilePhonesPage} />
          <Route path="/tablets" exact component={TabletsPage} />
          <Route path="/accessories" exact component={AccessoriesPage} />

          <Route path="/favorites" exact component={FavoritesPage} />
          <Route path="/cart" exact component={CartPage} />
          <Route path="/checkout" exact component={Checkout} />

const App: React.FC = () => (
  <div className="App">
    <Header />
    <main className="main">
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" exact component={Home} />
        <Route path="/phones" exact component={MobilePhonesPage} />
        <Route path="/tablets" exact component={TabletsPage} />
        <Route path="/accessories" exact component={AccessoriesPage} />

        <Route path="/favorites" exact component={FavoritesPage} />
        <Route path="/:section/:productId?" exact component={ProductDetailsPage} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;
