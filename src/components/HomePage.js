import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <main className="main-container">
    <h1>Home, sweet Home!</h1>

    <Link to="/phones">
      <img
        src="./img/phone_2x.gif"
        alt="gif"
      />
    </Link>
  </main>
);

export default HomePage;
