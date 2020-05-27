import React from 'react';
import { NavLink } from 'react-router-dom';

export const Breadcrumb = ({ to, label }: BreadcrumbProps) => {
  return (
    <li className="breadcrumbs__item">
      <span className="breadcrumbs__arrow"/>
      <NavLink
        to={to}
        className="breadcrumbs__link"
        activeClassName="breadcrumbs__link--active"
      >
        {label}
      </NavLink>
    </li>
  );
}
