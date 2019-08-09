import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () =>
  <div className="error404">
      <NavLink to="/" exact >Click to go to the HomePage</NavLink>
  </div>


export default NotFoundPage;
