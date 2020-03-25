import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFound404Page: FC = () => {
  return (
    <>
      <h2>Sorry but this page dont exist</h2>
      <Link to="/">To Home</Link>
    </>
  );
};
