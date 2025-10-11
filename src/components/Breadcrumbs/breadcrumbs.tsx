import { NavLink } from 'react-router-dom';
import './breadcrumbs.scss';

export const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `breadcrumbs__home ${isActive ? 'is-active' : ''}`
        }
      ></NavLink>
      <a className="breadcrumbs--arrow">&gt;</a>
      <p className="breadcrumbs__name">Phones</p>
    </div>
  );
};
