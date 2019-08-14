import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <div className="welcome-container">
      <Link to="/phones">
        <span className="welcome-text">
          Welcome to demo project - mobile phones store
        </span>
      </Link>
    </div>
  </div>
);

export default HomePage;
