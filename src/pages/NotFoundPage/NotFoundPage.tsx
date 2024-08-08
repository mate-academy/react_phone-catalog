import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="page-not-found">
      <h3 className="page-not-found__title">Page not found</h3>
      <Link to="/" className="page-not-found__link">
        back to HOME
      </Link>
      <img
        className="page-not-found__image"
        src="img/page-not-found.png"
        alt="page not found"
      />
    </div>
  );
};
