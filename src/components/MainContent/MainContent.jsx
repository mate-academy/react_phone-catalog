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
          render={() => (<PhoneDetailsContainer />)}
        />
        <Route
          render={() => (<PageNotFound />)}
        />
      </Switch>
    </div>
  );
};
