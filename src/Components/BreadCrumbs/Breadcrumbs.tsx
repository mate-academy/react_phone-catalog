import React from 'react';
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import './Breadcrumbs.scss';

const routes = [
  {
    path: '/',
    breadcrumb: () => (
      <img
        src="/img/icons/Home.png"
        alt="Home"
        style={{ width: 14, height: 14 }}
      />
    ),
  },
  { path: '/phones', breadcrumb: 'Phones' },
];

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <React.Fragment>
      <div className="breadcrumbs">
        {breadcrumbs.map(({ breadcrumb, key }, index) => {
          if (index === breadcrumbs.length - 1) {
            return (
              <span key={key} className="breadcrumb breadcrumb--not-active">
                {breadcrumb}
              </span>
            );
          }

          return (
            <div key={key} style={{ display: 'flex' }}>
              <NavLink to={key} className="breadcrumb">
                {breadcrumb}
              </NavLink>
              <img
                src="/img/icons/SliderRight.png"
                className="breadcrumb__slider"
              />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};
