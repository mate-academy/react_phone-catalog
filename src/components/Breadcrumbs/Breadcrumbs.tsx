import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';
import { getFormattedCrumb } from '../../helpers/getFormattedCrumb';

export const Breadcrumbs = () => {
  const location = useLocation();

  const crumbs = useMemo(() => {
    let currentpath = '';

    return location.pathname.split('/')
      .filter(crumb => !!crumb)
      .map((crumb, index, arr) => {
        currentpath += `/${crumb}`;

        const formattedCrumb = getFormattedCrumb(crumb);

        return (
          <li
            key={crumb}
            className="Breadcrumbs__item"
          >
            {index !== arr.length - 1
              ? (
                <Link to={currentpath}>
                  {formattedCrumb}
                </Link>
              )
              : formattedCrumb}
          </li>
        );
      });
  }, [location]);

  return (
    <div className="Breadcrumbs" data-cy="breadCrumbs">
      <ul className="Breadcrumbs__list">
        <li>
          <Link
            to="/home"
            className="Breadcrumbs__home-link"
            aria-label="home"
          />
        </li>
        {crumbs}
      </ul>
    </div>
  );
};
