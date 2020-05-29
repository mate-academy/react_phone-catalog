import React from 'react';
import { NavLink } from 'react-router-dom';

export const Breadcrumb = ({ to, label, isLast }: BreadcrumbProps) => {
  return (
    <li className="breadcrumbs__item">
      <span className="breadcrumbs__arrow" />
      {isLast
        ? <span className="breadcrumbs__last">{label}</span>
        : <NavLink
        to={to}
        className="breadcrumbs__link"
        activeClassName="breadcrumbs__link--active"
      >
        {label}
      </NavLink>}
    </li>
  );
};
