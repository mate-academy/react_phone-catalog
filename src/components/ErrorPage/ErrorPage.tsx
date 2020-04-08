import React from 'react';
import './ErrorPage.scss';
import {
  NavLink,
} from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <>
      <h1>Error page</h1>
      <NavLink to="/" className="homepage-btn">Home page</NavLink>
    </>
  );
};
