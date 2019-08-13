import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => (
  <>
    <h1 className="error-404">404</h1>
    <p className="error-404-desc">NotFoundPage</p>
    <NavLink className="error-404-link" to="/">Back to HomePage</NavLink>
  </>
);

export default NotFoundPage;
