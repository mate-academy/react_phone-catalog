/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="Not-found-page">
    <h1>Page not found</h1>
    <Link
      className="Not-found-page__link"
      to={`/`}
    >
      To home page
    </Link>
  </div>
);

export default NotFoundPage;
