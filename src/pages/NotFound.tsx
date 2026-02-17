import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      className="container"
      style={{ padding: '40px 0', textAlign: 'center' }}
    >
      <h1 className="title">Page not found</h1>

      <p style={{ marginTop: '16px' }}>
        <Link to="/" className="button is-link is-light">
          Go to Home page
        </Link>
      </p>
    </div>
  );
};
