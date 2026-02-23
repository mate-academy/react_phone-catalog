import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <div>Page not found</div>
      <Link to="/">Back to home page</Link>
    </>
  );
};
