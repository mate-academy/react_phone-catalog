import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();

  let currentPath = '';

  const crumbs = useMemo(() => {
    return location.pathname
      .split('/')
      .filter(crumb => crumb !== '')
      .map((crumb, index, arr) => {
        currentPath += `/${crumb}`;

        return (
          <li
            key={crumb}
            className="Breadcrumbs-Item"
          >
            {index !== arr.length - 1
              ? (
                <Link
                  className="Breadcrumbs-Link"
                  to={currentPath}
                >
                  {crumb}
                </Link>
              )
              : crumb}
          </li>
        );
      });
  }, [location]);

  return (
    <div
      className="Page-Breadcrumbs Breadcrumbs"
      data-cy="breadCrumbs"
    >
      <ul className="Breadcrumbs-List">
        <li
          key="homePath"
          className="Breadcrumbs-Item"
        >
          <Link
            className="Breadcrumbs-Icon Icon Icon_home"
            to="/home"
          />
        </li>

        {crumbs.map(crumb => crumb)}
      </ul>
    </div>
  );
};
