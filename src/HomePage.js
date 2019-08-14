
import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => (
  <div className="home_page">
    <NavLink
      className="navlink"
      to="/phones"
      exact
    >
        Go to Catalog
    </NavLink>
  </div>
);

export default HomePage;
