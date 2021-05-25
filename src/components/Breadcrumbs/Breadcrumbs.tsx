import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const pathNamesArr = pathname.split('/').slice(1);

  return (
    <div className="BackNav ProductList-BackNav">
      <Link
        to="/"
        className="BackNav-Home"
      >
        <img src="img/icons/home.svg" alt="home" />
      </Link>

      <img src="img/icons/arrow-right-inactive.svg" alt="home" className="BackNav-Arrow" />

      {pathNamesArr.map((path, i) => (
        pathNamesArr.length - 1 === i
          ? (
            <Link
              key={path}
              to={`/${path}`}
              className="BackNav-Path"
            >
              {path[0].toUpperCase() + path.slice(1)}
            </Link>
          )
          : (
            <div key={path} className="BackNav-Wrapper">
              <Link
                to={`/${path}`}
                className="BackNav-Path"
              >
                {path[0].toUpperCase() + path.slice(1)}
              </Link>
              <img src="img/icons/arrow-right-inactive.svg" alt="home" className="BackNav-Arrow" />
            </div>

          )
      ))}
    </div>
  );
};
