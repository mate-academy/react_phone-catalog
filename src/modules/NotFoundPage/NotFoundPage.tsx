import './NotFoundPage.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="notFoundPage">
      <p className="notFoundPage__title">Page not found</p>
      <Link to="/" className="notFoundPage__link">
        Go to HomePage
      </Link>
    </div>
  );
};
