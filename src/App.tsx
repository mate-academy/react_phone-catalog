import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PRODUCTS_URL, getData } from './helpers/Api';
import { Product } from './interfaces';
import { Navigation } from './components/Navigation/Navigation';
import { setProducts } from './store/phones';
import { getBasket, getFavorite } from './store/index';
import { Home } from './components/Home';
import { ItemCard } from './components/ItemCard/ItemCard';
import { FooterNav } from './components/Navigation/FooterNav';
import { Basket } from './components/Basket/Basket';
import { ProductPage } from './components/ProductsPage/ProductsPage';
import { NotFoundPage } from './components/NotFoundPage';
import { Favorite } from './components/Favorite';
import './styles/App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const favorite = useSelector(getFavorite);
  const basket = useSelector(getBasket);

  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify([...favorite]));
    localStorage.setItem('card', JSON.stringify([...basket]));
  }, [basket, favorite]);

  useEffect(() => {
    const getPhonesFromServer = async () => {
      const phonesList = await getData<Product>(PRODUCTS_URL);

      dispatch(setProducts(phonesList));
    };

    getPhonesFromServer();
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home"><Redirect to="/" /></Route>
        <Route path="/tablets/:productId" render={({ match }) => <ItemCard id={match.params.productId} />} />
        <Route path="/tablets/" component={ProductPage} />
        <Route path="/accessories/:productId" render={({ match }) => <ItemCard id={match.params.productId} />} />
        <Route path="/accessories/" component={ProductPage} />
        <Route path="/favorite/" component={Favorite} />
        <Route path="/basket/" component={Basket} />
        <Route path="/phones/:productId" render={({ match }) => <ItemCard id={match.params.productId} />} />
        <Route path="/phones/" component={ProductPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <FooterNav />
    </div>
  );
};

export default App;
