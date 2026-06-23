import './NotFoundPage.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__subtitle">Page not found</h2>
      <p className="not-found__text">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="not-found__link">
        Go to Home Page
      </Link>
    </div>
  );
};
