import React, { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';

const BREADCRUMBS = [
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/favourites', label: 'Favourites' },
];

export const Breadcrumbs = () => {
  const location = useLocation();

  const preparedBreadcrumbs = useMemo(() => {
    return BREADCRUMBS
      .filter(item => item.to === location.pathname);
  }, [location]);

  return (
    <ul className="breadcrumbs section__breadcrumbs">
      <NavLink
        to="/"
        className="breadcrumbs__item breadcrumbs__home"
        activeClassName="breadcrumb__link--active"
      />
      {preparedBreadcrumbs.map((crumb, index) => (
        <Breadcrumb
          {...crumb}
          key={crumb.to}
          isLast={index === preparedBreadcrumbs.length - 1}
        />
      ))}
    </ul>
  );
};
