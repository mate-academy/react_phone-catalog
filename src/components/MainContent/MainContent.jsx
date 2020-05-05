import React from 'react';
import './MainContent.scss';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../Home/Home';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import PhonesContainer from '../Phones/PhonesContainer';
// eslint-disable-next-line max-len
import PhoneDetailsContainer from '../Phones/PhoneDetailsPage/PhoneDetailsContainer';
import CartContainer from '../Cart/CartContainer';
import FavoritesContainer from '../Favorites/FavoritesContainer';

export const MainContent = () => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Route
          path="/"
          component={Home}
          exact
        />
        <Route
          path="/phones"
          component={PhonesContainer}
          exact
        />
        <Route
          path="/basket"
          component={CartContainer}
        />
        <Route
          path="/favorites"
          component={FavoritesContainer}
        />
        <Route
          path="/phones/:phoneId"
          component={PhoneDetailsContainer}
        />
        <Route
          component={PageNotFound}
        />
      </Switch>
    </div>
  );
};
