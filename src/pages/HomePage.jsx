import React from 'react';
import { NavLink } from "react-router-dom";
import { GIT_HUB_H2ASH } from '../components/constants';

const HomePage = () => (
  <main className="wrapper__main wrapper__main--home home">
    <section className="home__section">
      <h1 className="home__heading">Welcome to phone shop!</h1>
      <p className="home__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
      <button className="button button--home">
        <NavLink
          className="link link--home-button"
          to="/phones"
        >
          Watch phones
        </NavLink>
      </button>
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

export default HomePage;
