import React, { Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();
  const levels = location.pathname.split('/');

  return (
    <div className="Breadcrumbs">
      {levels.map((level, index) => {
        const address = levels.slice(0, index + 1).join('/');
        let className;

        switch (index) {
          case 0:
            className = 'Breadcrumbs__Link Breadcrumbs__Link--first';
            break;
          case (levels.length - 1):
            className = 'Breadcrumbs__Link Breadcrumbs__Link--last';
            break;
          default:
            className = 'Breadcrumbs__Link';
        }

        return (
          <Fragment key={level}>
            <Link
              to={address}
              className={className}
            >
              {level}
            </Link>
            {
              index !== levels.length - 1
                ? <span className="Breadcrumbs__Arrow" />
                : ''
            }
          </Fragment>
        );
      })}
    </div>
  );
};
