import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h2>Home Page</h2>
    <div className="welcome-container">
      <Link to="/phones">
        <span className="welcome-text">
          Welcome to the best mobile phones store in the world !!!
        </span>
      </Link>
    </div>
  </div>
);

export default HomePage;
