import React from 'react';

import { useLocation, NavLink } from 'react-router-dom';
import './BreadCrumbs.scss';

export const BreadCrumbs = () => {
  const location = useLocation();
  const stage = location.pathname.split('/');

  return (
    <div className="breadcrumbs">
      <NavLink
        to="/"
        className="breadcrumbs__item"
        activeClassName="breadcrumbs__item--active"
      >
        <img src="img/Icons/Home.png" alt="home icon" className="breadcrumbs__icon" />
      </NavLink>

      {stage.map((step, index) => {
        const breadCrumbsLine = stage.slice(0, index + 1).join('/');

        return (
          <>
            {index === stage.length - 1
              ? <span className="breadcrumbs__step">{step}</span>
              : (
                <NavLink
                  className="breadcrumbs__step"
                  to={breadCrumbsLine}
                >
                  {step}
                </NavLink>
              )}
            { index !== stage.length - 1
              ? (<img src="img/Icons/crumbs_arrow.svg" alt="home icon" className="breadcrumbs__icon" />)
              : '' }
          </>
        );
      })}
    </div>
  );
};
