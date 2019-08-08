import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="NotFoundPage">
    <h1 className="HomePage">Page not found</h1>

    <NavLink
      className="navlink"
      to="/"
      exact
    >
      Back to Home
    </NavLink>

  </div>
);

export default NotFoundPage;
