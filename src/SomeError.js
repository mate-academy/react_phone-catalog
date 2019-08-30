import React from 'react';
import { NavLink } from 'react-router-dom';

const SomeError = () =>
  <div>
  <h1>Phone was not found</h1>
      <NavLink to="/phones" className="not_found_phone">Click to return</NavLink>
  </div>


export default SomeError;
