import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Page not found</h2>
      <p>The page you requested doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}
