import { NavLink, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`;

      const capitalizedCrumb = crumb
        .split('-')
        .map((word) => {
          const capitalized = word.charAt(0).toUpperCase()
          + word.slice(1);

          return capitalized;
        })
        .join(' ');

      return (
        <div
          className="breadcrumbs__crumb"
          data-cy="breadCrumbs"
          key={crumb}
        >
          <div className="breadcrumbs__separator" />
          <NavLink
            to={currentLink}
            className="breadcrumbs__link"
          >
            {capitalizedCrumb}
          </NavLink>
        </div>

      );
    });

  return (
    <div className="breadcrumbs">
      <NavLink to="/home" className="breadcrumbs__home" />
      {crumbs}
    </div>
  );
};
