import React from 'react';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="notFoundPage">
      <p>Page not found</p>
      <Link to="/">Go to HomePage</Link>
    </div>
  );
};
