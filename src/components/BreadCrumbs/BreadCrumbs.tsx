import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path);

  return (
    <div className="breadcrumbs">

      <NavLink to="/">
        <span className="breadcrumbs__home-icon" />
      </NavLink>

      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <span className="breadcrumbs__separator" />
          <Link to={`/${path}`} className="breadcrumbs__link">
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};
