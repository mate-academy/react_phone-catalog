import React from 'react';
import './MainContent.scss';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Tablets } from '../Tablets/Tablets';
import { Accessories } from '../Accessories/Accessories';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import PhonesContainer from '../Phones/PhonesContainer';
// eslint-disable-next-line max-len
import PhoneDetailsContainer from '../Phones/PhoneDetailsPage/PhoneDetailsContainer';
import { BasketContainer } from '../Basket/BasketContainer';

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
          path="/tablets"
          component={Tablets}
        />
        <Route
          path="/accessories"
          component={Accessories}
        />
        <Route
          path="/basket"
          component={BasketContainer}
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
