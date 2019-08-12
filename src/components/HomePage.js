import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <main className="main-container main-container--home">
    <div>
      <h1 className="home__header">Welcome to phone shope!</h1>

      <p className="home__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam.
      </p>

      <Link
        to="/phones"
        className="button button--home"
      >
        Watch Phones
      </Link>
    </div>

    <div className="home__image-container">
      <Link
        to="/phones"
      >
        <img
          src="./img/phone_2x.gif"
          alt="gif"
        />
      </Link>
    </div>

  </main>
);

export default HomePage;
