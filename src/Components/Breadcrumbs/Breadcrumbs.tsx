import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import './Breadcrumbs.scss';

export const Breadcrumbs:React.FC = () => {
  const location = useLocation().pathname.split('/').slice(1);

  return (
    <div className="breadcrumbs">
      <NavLink to="/" className="breadcrumbs__link">
        <i className="fas fa-home" />
      </NavLink>
      {' > '}
      {location.slice(0, -1).map(x => (
        <NavLink to={`/${x}`} className="breadcrumbs__link" key={x}>
          {`${x} > `}
        </NavLink>
      ))}
      <span>{location[location.length - 1]}</span>
    </div>
  );
};
