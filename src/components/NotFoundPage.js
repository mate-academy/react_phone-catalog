import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="not-found-page">
    <h1>Page is not found</h1>
    <p>
      Please, return to the
      <NavLink to="/">Home page</NavLink>
    </p>
  </div>
);

export default NotFoundPage;
