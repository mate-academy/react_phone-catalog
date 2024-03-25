import React from 'react';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <div className="NotFoundPage">
    <p className="NotFoundPage__text">Page not found</p>
    <Link to="/" className="NotFoundPage__link">
      Go to home
    </Link>
  </div>
);
