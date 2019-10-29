
import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => (
  <div className="hom">
    <NavLink
      className="navlink"
      to="/phones"
      exact
    >
      <div className="home_page" />
    </NavLink>
  </div>
);

export default HomePage;
