import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BadgeHome } from '../BadgeHome/BadgeHome';

import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation().pathname.split('/').slice(1);
  const pathName = location
    .join('')[0].toUpperCase() + location.join('').slice(1);

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <NavLink to="/" className="breadcrumbs__link">
        <BadgeHome />
      </NavLink>
      {' > '}
      {location.slice(0, -1).map(x => (
        <NavLink to={`/${x}`} className="breadcrumbs__link" key={x}>
          {`${x} > `}
        </NavLink>
      ))}
      <span>{pathName}</span>
    </div>
  );
};
