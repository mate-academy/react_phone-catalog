import React from 'react';
import { Link } from 'react-router-dom';
import { PathType } from '../../types/Types';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <div>Page not found</div>
      <Link to={PathType.HOME}>Back to home page</Link>
    </>
  );
};
