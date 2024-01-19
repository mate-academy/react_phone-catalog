import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="NotFoundPage">
      <div className="container">
        <div className="NotFoundPage__content">
          <h1 className="NotFoundPage__title">
            Oops, page not found.
          </h1>

          <Link to="/" className="NotFoundPage__link">
            Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};
