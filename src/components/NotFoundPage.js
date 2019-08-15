import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h1>404 Page not found</h1>
    <div>
      <Link to="/">Return to Home Page</Link>
    </div>
  </div>
);

export default NotFoundPage;
