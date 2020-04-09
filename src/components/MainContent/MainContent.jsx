import React from 'react';
import './MainContent.scss';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Tablets } from '../Tablets/Tablets';
import { Accessories } from '../Accessories/Accessories';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import PhonesContainer from '../Phones/PhonesContainer';
import { PhonesDetails } from '../Phones/PhoneDetailsPage/PhoneDetailsPage';

export const MainContent = () => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Route
          path="/"
          render={() => (<Home />)}
          exact
        />
        <Route
          path="/phones"
          render={() => (<PhonesContainer />)}
          exact
        />
        <Route
          path="/tablets"
          render={() => (<Tablets />)}
        />
        <Route
          path="/accessories"
          render={() => (<Accessories />)}
        />
        <Route
          path="/phones/:phoneId"
          render={() => (<PhonesDetails />)}
        />
        <Route
          render={() => (<PageNotFound />)}
        />
      </Switch>
    </div>
  );
};
