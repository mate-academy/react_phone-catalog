import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="page__section not-found">
      <h1 className="page__title">
        The page was not found...
      </h1>

      <Link to="/" className="not-found__link">
        Go home
      </Link>
    </div>
  );
};
