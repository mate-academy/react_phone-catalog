import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFound404Page: FC = () => {
  return (
    <>
      <h2>Page not found</h2>
      <Link to="/">Home</Link>
    </>
  );
};