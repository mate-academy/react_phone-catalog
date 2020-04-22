import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const PageNotFound: FC = () => (
  <div style={{ textAlign: 'center' }}>
    <h2>Page not found</h2>
    <NavLink
      to="/"
      exact
    >
      Home
    </NavLink>
  </div>
);
