import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';
import { getFormattedCrumb } from '../../helpers/getFormattedCrumb';

export const Breadcrumbs = () => {
  const location = useLocation();

  let currentpath = '';

  const crumbs = location.pathname.split('/')
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

  return (
    <div className="Breadcrumbs" data-cy="breadCrumbs">
      <ul className="Breadcrumbs__list">
        <li>
          <Link
            to="/home"
            className="Breadcrumbs__home-link"
          />
        </li>
        {crumbs}
      </ul>
    </div>
  );
};
