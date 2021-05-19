import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HomePage } from './pages/Home/HomePage';
import { PhonesPage } from './pages/Phones/PhonesPage';
import { TabletsPage } from './pages/Tablets/TabletsPage';
import { AccessoriesPage } from './pages/Accessories/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { Cart } from './pages/Cart/Cart';
import { Favourites } from './pages/Favourites/Favourites';
import { loadGoods } from './store/store';

import './App.scss';
import './helpers/utils/_reset.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGoods());
  }, []);

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/phones" exact component={PhonesPage} />
      <Route path="/tablets" exact component={TabletsPage} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/accessories" exact component={AccessoriesPage} />
      <Route path="/favorites" exact component={Favourites} />
      <Route path="/phones/:productId" component={ProductDetailsPage} />
      <Route path="/tablets/:productId" component={ProductDetailsPage} />

      <Redirect path="/home" to="/" />
    </Switch>
  );
};

export default App;
