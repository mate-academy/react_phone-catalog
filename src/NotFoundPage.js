import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () =>
  <div className="error404">
  <h1>Page not found</h1>
      <NavLink to="/" exact className="not_found_phone">Click to go to the HomePage</NavLink>
  </div>


export default NotFoundPage;
