import React, { useMemo } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { NavLink, useLocation } from 'react-router-dom';

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
  }, [location.pathname]);

  return (
    <ul className="breadcrumbs section__breadcrumbs">
      <NavLink
        to="/"
        className="breadcrumbs__item breadcrumbs__home"
        activeClassName="breadcrumb__link--active"
      />
      {preparedBreadcrumbs.map((crumb) =>
        <Breadcrumb {...crumb} key={crumb.to} />
        )}
    </ul>
  );
}
