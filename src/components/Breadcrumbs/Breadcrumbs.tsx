import React from 'react';
import './Breadcrumbs.scss';

import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { HomeIcon } from '../Icons/HomeIcon';
import { NavLink } from 'react-router-dom';
import { VectorIcon } from '../Icons/VectorIcon';

const routes = [
  { path: '/', breadcrumb: HomeIcon },
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
            <>
              <NavLink to={key} className="breadcrumb">
                {breadcrumb}
              </NavLink>
              <VectorIcon />
            </>
          );
        })}
      </div>
    </React.Fragment>
  );
};
