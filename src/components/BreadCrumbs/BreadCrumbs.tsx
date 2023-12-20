/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React from 'react';
import './BreadCrumbs.scss';
import { Link, useLocation } from 'react-router-dom';

export const BreadCrumbs: React.FC = () => {
  const crumbs = useLocation()
    .pathname.split('/')
    .filter((crumb) => crumb !== '');

  let currentLink = '';

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <Link to="/" className="breadcrumbs__home" />

      {crumbs.map((crumb) => {
        currentLink += `/${crumb.toLowerCase()}`;

        return (
          <div className="breadcrumbs__link" key={crumb}>
            <div className="breadcrumbs__icon" />
            <Link
              to={`${currentLink}`}
              key={crumb}
              className="breadcrumbs__link-to"
            >
              {crumb}
            </Link>
            <div />
          </div>

        );
      })}
    </div>
  );
};
