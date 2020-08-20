import React from 'react';
import { NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';

const Breadcrumbs = (props: { title: React.ReactNode }) => {
  return (
    <HashRouter>
      <div className="breadcrumbs">
        <NavLink to="/" exact>
          <img
            src="img/icons/home.svg"
            alt="home icon"
            className="breadcrumbs__home"
          />
        </NavLink>
        <img
          src="img/icons/breadcrumbs-arrow.svg"
          alt="arrow icon"
          className="breadcrumbs__arrow"
        />
        <p className="breadcrumbs__title">
          {props.title}
        </p>
      </div>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </HashRouter>
  );
};

export default Breadcrumbs;
