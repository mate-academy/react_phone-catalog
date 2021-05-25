import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Home } from './pages/Home';
import { ProductsCatalog } from './pages/ProductsCatalog';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Cart } from './pages/Cart';
import { Favourites } from './pages/Favourites';
import { loadGoods } from './store';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.scss';
import './helpers/utils/_reset.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGoods());
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/phones" exact component={ProductsCatalog} />
      <Route path="/tablets" exact component={ProductsCatalog} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/accessories" exact component={ProductsCatalog} />
      <Route path="/favorites" exact component={Favourites} />
      <Route path="/phones/:productId" component={ProductDetailsPage} />
      <Route path="/tablets/:productId" component={ProductDetailsPage} />
      <Route component={NotFoundPage} />

      <Redirect path="/home" to="/" />
    </Switch>
  );
};

export default App;
