import './Breadcrumbs.scss';
import React, { Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const levels = location.pathname.split('/');

  return (
    <div className="Breadcrumbs">
      {levels.map((level, index) => {
        const address = levels.slice(0, index + 1).join('/');
        let className;

        switch (index) {
          case 0:
            className = 'Breadcrumbs__link Breadcrumbs__link--first';
            break;
          case (levels.length - 1):
            className = 'Breadcrumbs__link Breadcrumbs__link--last';
            break;
          default:
            className = 'Breadcrumbs__link';
        }

        return (
          <Fragment key={level}>
            <Link
              to={address}
              className={className}
            >
              {level}
            </Link>
            {index !== levels.length - 1
              ? <span className="Breadcrumbs__arrow" />
              : ''}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
