import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../views/HomePage';
import { PhonesPage } from '../views/PhonesPage';
import { TabletsPage } from '../views/TabletsPage';
import { AccessoriesPage } from '../views/AccessoriesPage';
import { FavouritesPage } from '../views/FavouritesPage';
import { CartPage } from '../views/CartPage';
import { NoMatchPage } from '../views/NoMatchPage';
import { PhoneDetailsPage } from '../views/PhoneDetailsPage';

export const Router: FC = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/phones" component={PhonesPage} exact />
    <Route path="/phones/:phoneId" component={PhoneDetailsPage} />
    <Route path="/tablets" component={TabletsPage} exact />
    <Route path="/accessories" component={AccessoriesPage} exact />
    <Route path="/favourites" component={FavouritesPage} exact />
    <Route path="/cart" component={CartPage} exact />
    <Route path="/*" component={NoMatchPage} />
  </Switch>
);
