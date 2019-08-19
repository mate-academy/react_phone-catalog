import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import PhonesPage from '../PhonesPage/PhonesPage';
import Basket from '../Basket/Basket';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const Main = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/phones" component={PhonesPage} />
    <Route path="/basket" component={Basket} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Main;
