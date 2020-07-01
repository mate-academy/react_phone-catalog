import React from 'react';
import { NavLink } from 'react-router-dom';

type BreadcrumbProps = {
  label: string;
  link: string;
  isLast: boolean;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ label, link, isLast }) => {
  return (
    <li className="breadcrumbs__item">
      <img src="img/stroke_right.png" alt="stroke" className="Breadcrumbs__link-image" />
      {isLast
        ? <span className="breadcrumbs__last">{label[0].toUpperCase() + label.slice(1)}</span>
        : (
          <NavLink
            to={link}
            className="breadcrumbs__link"
            activeClassName="breadcrumbs__link-active"
          >
            {label[0].toUpperCase() + label.slice(1)}
          </NavLink>
        )}
    </li>
  );
};
