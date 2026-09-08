import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Page not found</p>
        <p className="not-found__description">
          The page you are looking for doesn&apos;t exist or has been moved to
          another location.
        </p>
        <Link to="/" className="not-found__button">
          Go to Home page
        </Link>
      </div>
    </div>
  );
};
