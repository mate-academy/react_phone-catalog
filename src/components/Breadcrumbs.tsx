import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/breadcrumps.scss';

export const Breadcrumbs:FC = () => {
  const location = useLocation();
  const section = location.pathname.split('/');

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <NavLink
        to="/"
        className="breadcrumbs__link"
      >
        <i className="fa-solid fa-house" />
      </NavLink>
      {' > '}
      <span>{section}</span>
    </div>
  );
};
