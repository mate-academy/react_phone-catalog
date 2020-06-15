import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';

export const Breadcrumbs = () => {
  const location = useLocation();
  const preparedNames = location.pathname
    .split('/')
    .slice(1);

  const preparedBreadcrumbs = preparedNames
    .reduce((accum: string[], item) => [...accum, `${accum}/${item}`], []);


  return (
    <ul className="breadcrumbs">
      <NavLink
        to="/"
        className="breadcrums__item"
        activeClassName="breadcrumbs__link-active"
      >
        <img src="img/Home.png" alt="home_icon" className="Breadcrumbs__icon" />
      </NavLink>
      {preparedBreadcrumbs.map((crumb, index) => (
        <Breadcrumb
          label={preparedNames[index]}
          link={crumb}
          key={crumb}
          isLast={index === preparedBreadcrumbs.length - 1}
        />
      ))}
    </ul>
  );
};
