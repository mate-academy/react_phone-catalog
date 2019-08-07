import React from 'react';
import { NavLink } from 'react-router-dom';

const NoMatch = () => (
  <div>
    <h1>404</h1>
    <img src="https://i.gifer.com/MbHR.gif" alt="You are lost" />
    <NavLink to="/" exact>Back to Home</NavLink>
  </div>
);

export default NoMatch;
