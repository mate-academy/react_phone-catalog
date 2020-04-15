import React from 'react';
import { NavLink } from 'react-router-dom';

import './PageNotFound.scss';

export const PageNotFound = () => (
  <div className="notFound">
    <h2 className="notFound__heading">Error: 404</h2>
    <h3 className="notFound__text">
      Sorry, page is not found. You can pass to the &nbsp;
      <NavLink
        className="notFound__link"
        to="/"
        exact
      >
        Home page
      </NavLink>
    </h3>

  </div>
);
