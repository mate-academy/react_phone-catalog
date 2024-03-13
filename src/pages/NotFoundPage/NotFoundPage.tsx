import React from 'react';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="notFoundPage">
      <span className="notFoundPage__massage">Page not found</span>

      <Link to="/" className="notFoundPage__link">
        Back to Home page
      </Link>
    </div>
  );
};
