import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h1>Page not found</h1>
    <span>
      <NavLink
        className="navlink"
        to="/"
        exact
      >
        here is Home
      </NavLink>
    </span>
  </div>
);

export default NotFoundPage;
