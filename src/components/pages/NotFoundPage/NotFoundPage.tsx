import React from 'react';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">Page not found</h1>
      <div className="not-found__container">
        <Link to="/" className="not-found__link">
          Home
        </Link>
        <div className="not-found__image-box">
          <img
            src="./img/page-not-found.png"
            alt="Page not found image"
            className="not-found__image"
          />
        </div>
      </div>
    </div>
  );
};
