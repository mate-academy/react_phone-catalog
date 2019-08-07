import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => (
  <>
    <h1>Page is not found</h1>
    <p>Please, return to the </p>
    <NavLink to="/">Home page</NavLink>
  </>
);

export default Home;
