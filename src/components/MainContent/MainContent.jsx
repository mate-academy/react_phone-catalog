import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Phones } from '../Phones/Phones';
import { Tablets } from '../Tablets/Tablets';
import { Accessories } from '../Accessories/Accessories';
import { PageNotFound } from '../PageNotFound/PageNotFound';

export const MainContent = () => {
  return (
    <div className="app-wrapper__content">
      <Switch>
        <Route
          path="/"
          render={() => (<Home />)}
          exact
        />
        <Route
          path="/phones"
          render={() => (<Phones />)}
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
          render={() => (<PageNotFound />)}
        />
      </Switch>
    </div>
  );
};
