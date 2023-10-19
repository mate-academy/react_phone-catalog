import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="NotFoundPage">
      <NavLink
        to="/home"
        className="NotFoundPage__backToHome"
      >
        <span className="BreadCrumbs__span">
          &#60;
        </span>
        Back
      </NavLink>
      <h1 className="NotFoundPage__title">Page not found</h1>
    </div>
  );
};
