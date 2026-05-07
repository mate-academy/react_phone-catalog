import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <>
    <h1>Page not found</h1>
    <Link to="/">Back to Home</Link>
  </>
);
