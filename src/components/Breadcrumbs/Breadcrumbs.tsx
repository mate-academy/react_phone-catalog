import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPageName } from '../../helpers/getPageName';
import './Breadcrumbs.scss';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const breadcrumbs = pathname.split('/');
  const firstCrumb = breadcrumbs[1];
  const secondCrumb = breadcrumbs[2];
  const transformFirstCrumb = getPageName(pathname);

  return (
    <div className="Breadcrumbs">
      <Link
        to="/home"
        className="icon icon--home"
      />

      <div className="Breadcrumbs__split">
        <div className="icon icon--arrow-right-light" />
      </div>

      <Link
        to={`/${firstCrumb}`}
        className={classNames(
          'Breadcrumbs__link',
          { 'Breadcrumbs__link--active': breadcrumbs.length > 2 },
        )}
      >
        {transformFirstCrumb}
      </Link>

      {breadcrumbs.length > 2
        && (
          <div className="Breadcrumbs__split">
            <div className="icon icon--arrow-right-light" />
          </div>
        )}

      <span className="small-text small-text--light">
        {secondCrumb}
      </span>
    </div>
  );
};
