import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p>
        Go back to <Link to="/">Home</Link>
      </p>
    </main>
  );
};
