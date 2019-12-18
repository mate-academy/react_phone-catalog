/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { GIT_HUB_H2ASH } from '../../lib/constants';

const Index = () => (
  <main className="wrapper__main wrapper__main--home home">
    <section className="home__section">
      <h1 className="heading heading--xl home__heading">Welcome to phone shop!</h1>
      <p className="home__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
      <NavLink
        className="link button button--home "
        to="/phones"
      >
        Watch phones
      </NavLink>
    </section>
    <div className="home__caller-div">
      <NavLink
        to="/phones"
        exact
      >
        <img
          className="home__caller-gif"
          src={`${GIT_HUB_H2ASH}/react_phone-catalog/img/phone_2x.gif`}
          alt="gif with phone on green circle"
        />
      </NavLink>
    </div>
  </main>
);

export default Index;
