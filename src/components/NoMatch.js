import React from 'react';
import { NavLink } from 'react-router-dom';

const NoMatch = () => (
  <main className="main-container">
    <NavLink to="/" exact>
      <img src="./img/404-drib23.gif" alt="You are lost" />
    </NavLink>

    <p className="author">
Author
      <a
        // eslint-disable-next-line max-len
        href="https://dribbble.com/shots/2597126-404-Got-Lost?ref=blogduwebdesign.com"
        title="link to gif author"
        target="blank"
      >
        Anastasiia Andriichuk
      </a>
    </p>

    <h2>404</h2>
    <NavLink to="/" exact>Back to Home</NavLink>
  </main>
);

export default NoMatch;
